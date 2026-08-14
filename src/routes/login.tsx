import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — InterviewAI" },
      {
        name: "description",
        content: "Sign in to InterviewAI to continue your AI-powered mock interview practice.",
      },
    ],
  }),
  ssr: false,
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login({ email: formData.email, password: formData.password });
      toast.success("Welcome back!", {
        description: "You're now signed in. Ready to practice?",
      });
      navigate({ to: "/setup" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign in failed";
      toast.error("Sign in failed", { description: message });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-3">
                <LogIn className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue your interview practice
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-lg">
            <form onSubmit={handleSubmit} className="space-y-5" id="login-form" noValidate>
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium text-slate-200">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-slate-700 bg-slate-800 pl-10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-xs font-medium text-red-500">{validationErrors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-slate-700 bg-slate-800 pl-10 pr-10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-xs font-medium text-red-500">{validationErrors.password}</p>
                )}
              </div>

              {/* Sign In Button */}
              <Button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                size="lg"
              >
                {loading ? "Signing in…" : "Sign In"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-slate-900 px-2 text-slate-400">Don't have an account?</span>
                </div>
              </div>

              {/* Register Link */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                size="lg"
                onClick={() => navigate({ to: "/register" })}
              >
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
