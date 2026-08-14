import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  login as apiLogin,
  register as apiRegister,
  getCurrentUser,
  logout as apiLogout,
  type UserProfile,
  type LoginRequest,
  type RegisterRequest,
} from "./api";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    // Only run in browser environment, not during SSR
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      setToken(savedToken);
      // Try to load current user
      getCurrentUser(savedToken)
        .then((profile) => {
          setUser(profile);
          setError(null);
        })
        .catch((err) => {
          // Token is invalid, clear it
          localStorage.removeItem("auth_token");
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setError(null);
      setLoading(true);
      const response = await apiLogin(credentials);
      
      // Save token (only in browser)
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", response.access_token);
      }
      setToken(response.access_token);

      // Fetch user profile
      const profile = await getCurrentUser(response.access_token);
      setUser(profile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setError(null);
      setLoading(true);
      
      // Register user
      await apiRegister(data);

      // Auto-login after registration
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await apiLogout(token);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // Only access localStorage in browser
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
      setToken(null);
      setUser(null);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

/**
 * Wraps a route component and redirects unauthenticated users to /login.
 * Usage: wrap the page JSX in <RequireAuth>...</RequireAuth>
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
