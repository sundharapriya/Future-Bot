import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react, u as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { F as Brain, g as Menu, r as User, t as X, v as LogOut } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bfi8i8Rl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
/**
* Global decorative background: gradient wash, blurred floating blobs,
* faint neural-network lines and a light dotted grid texture.
* Purely presentational and pointer-events-none.
*/
function AppBackground() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden app-backdrop",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-dot-grid text-primary/15 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-0 h-full w-full text-primary/40 opacity-[0.08]",
				viewBox: "0 0 1200 800",
				preserveAspectRatio: "xMidYMid slice",
				fill: "none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					stroke: "currentColor",
					strokeWidth: "1.2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 180 L220 180 L320 90 L560 90 L660 210 L900 210 L1010 120 L1200 120" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 460 L180 460 L300 560 L520 560 L640 430 L880 430 L1000 540 L1200 540" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160 0 L160 200 L260 300 L260 620 L380 720 L380 800" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M860 0 L860 160 L960 260 L960 640 L1080 740 L1080 800" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					fill: "currentColor",
					children: [
						[220, 180],
						[320, 90],
						[660, 210],
						[1010, 120],
						[300, 560],
						[640, 430],
						[1e3, 540],
						[260, 300],
						[960, 260],
						[380, 720]
					].map(([cx, cy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx,
						cy,
						r: "5"
					}, `${cx}-${cy}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "float-slow absolute -left-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-primary/25 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "float-slower absolute -right-28 top-10 h-[22rem] w-[22rem] rounded-full bg-accent/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "float-slower absolute -left-24 bottom-0 h-[20rem] w-[20rem] rounded-full bg-accent/15 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "float-slow absolute -right-40 bottom-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[var(--primary-glow)]/20 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[12%] top-[28%] h-40 w-40 rotate-12 rounded-3xl border border-primary/15" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[14%] bottom-[22%] h-52 w-52 -rotate-6 rounded-full border border-accent/20" })
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border/70 bg-card/50 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display font-bold",
						children: "InterviewAI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xs text-sm text-muted-foreground",
					children: "AI-powered mock interviews with instant evaluation, personalised feedback and a complete score report."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Practice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/setup",
							className: "transition-colors hover:text-primary",
							children: "Interview setup"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/interview",
							className: "transition-colors hover:text-primary",
							children: "Mock interview"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/evaluation",
							className: "transition-colors hover:text-primary",
							children: "Answer evaluation"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/report",
							className: "transition-colors hover:text-primary",
							children: "Final report"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Topics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Python & SQL" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Machine Learning & AI" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Data Structures" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "HR & behavioural" })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border/70 px-4 py-6 text-center text-xs text-muted-foreground",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" InterviewAI. Built for interview practice."
			]
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			hero: "bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-110 hover:-translate-y-0.5",
			accent: "bg-accent text-accent-foreground shadow hover:bg-accent/90 hover:-translate-y-0.5",
			soft: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent/10 hover:border-accent hover:text-accent",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent/10 hover:text-accent",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-5 py-2",
			sm: "h-9 rounded-lg px-3.5 text-xs",
			lg: "h-12 rounded-xl px-8 text-base",
			icon: "h-10 w-10",
			"icon-lg": "h-14 w-14 rounded-2xl"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
/**
* REST client for the Python backend.
*
* The frontend uses a backend base URL from environment configuration.
*/
var API_BASE_URL = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_BASE_URL": "http://localhost:8000"
}["VITE_API_BASE_URL"] || (typeof window !== "undefined" && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("127.0.0.1") ? "https://future-bot-ohgv.onrender.com" : "http://127.0.0.1:8000");
async function request(path, init) {
	try {
		const headers = new Headers(init?.headers);
		const body = init?.body;
		if (body && !(body instanceof FormData)) headers.set("Content-Type", "application/json");
		const response = await fetch(`${API_BASE_URL}${path}`, {
			...init,
			headers
		});
		const text = await response.text();
		if (!response.ok) {
			let detail = response.statusText;
			try {
				const payload = text ? JSON.parse(text) : null;
				if (payload && typeof payload === "object") detail = payload.detail || payload.message || detail;
			} catch {}
			throw new Error(`Request failed: ${response.status} ${detail}`);
		}
		if (!text) return {};
		return JSON.parse(text);
	} catch (error) {
		if (error instanceof Error) throw error;
		throw new Error("Unknown network error");
	}
}
async function register(body) {
	return request("/api/v1/auth/register", {
		method: "POST",
		body: JSON.stringify(body)
	});
}
async function login(body) {
	return request("/api/v1/auth/login", {
		method: "POST",
		body: JSON.stringify(body)
	});
}
async function getCurrentUser(token) {
	return request("/api/v1/auth/me", {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` }
	});
}
async function logout(token) {
	return request("/api/v1/auth/logout", {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` }
	});
}
var api = {
	startInterview: (body) => request("/api/v1/interview/start", {
		method: "POST",
		body: JSON.stringify(body)
	}),
	getQuestion: (session_id) => request(`/api/v1/interview/question/${encodeURIComponent(session_id)}`, { method: "GET" }),
	submitAnswer: (body) => request("/api/v1/interview/answer", {
		method: "POST",
		body: JSON.stringify(body)
	}),
	evaluateAnswer: (body) => request("/api/v1/interview/evaluate", {
		method: "POST",
		body: JSON.stringify(body)
	}),
	getScore: (sessionId) => request(`/api/v1/interview/score/${encodeURIComponent(sessionId)}`, { method: "GET" }),
	getFinalReport: (sessionId) => request(`/api/v1/interview/report/${encodeURIComponent(sessionId)}`, { method: "GET" }),
	transcribeSpeech: (file) => {
		const form = new FormData();
		form.append("file", file);
		return request("/api/v1/speech/transcribe", {
			method: "POST",
			body: form
		});
	}
};
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [token, setToken] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") {
			setLoading(false);
			return;
		}
		const savedToken = localStorage.getItem("auth_token");
		if (savedToken) {
			setToken(savedToken);
			getCurrentUser(savedToken).then((profile) => {
				setUser(profile);
				setError(null);
			}).catch((err) => {
				localStorage.removeItem("auth_token");
				setToken(null);
				setUser(null);
			}).finally(() => setLoading(false));
		} else setLoading(false);
	}, []);
	const login$1 = async (credentials) => {
		try {
			setError(null);
			setLoading(true);
			const response = await login(credentials);
			if (typeof window !== "undefined") localStorage.setItem("auth_token", response.access_token);
			setToken(response.access_token);
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
	const register$1 = async (data) => {
		try {
			setError(null);
			setLoading(true);
			await register(data);
			await login$1({
				email: data.email,
				password: data.password
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Registration failed";
			setError(message);
			throw err;
		} finally {
			setLoading(false);
		}
	};
	const logout$1 = async () => {
		try {
			if (token) await logout(token);
		} catch (err) {
			console.error("Logout error:", err);
		} finally {
			if (typeof window !== "undefined") localStorage.removeItem("auth_token");
			setToken(null);
			setUser(null);
			setError(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			token,
			loading,
			isAuthenticated: !!user && !!token,
			login: login$1,
			register: register$1,
			logout: logout$1,
			error
		},
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (context === void 0) throw new Error("useAuth must be used within AuthProvider");
	return context;
}
/**
* Wraps a route component and redirects unauthenticated users to /login.
* Usage: wrap the page JSX in <RequireAuth>...</RequireAuth>
*/
function RequireAuth({ children }) {
	const { isAuthenticated, loading } = useAuth();
	const navigate = useNavigate();
	import_react.useEffect(() => {
		if (!loading && !isAuthenticated) navigate({ to: "/login" });
	}, [
		loading,
		isAuthenticated,
		navigate
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" })
	});
	if (!isAuthenticated) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/setup",
		label: "Setup"
	},
	{
		to: "/interview",
		label: "Interview"
	},
	{
		to: "/evaluation",
		label: "Evaluation"
	},
	{
		to: "/report",
		label: "Report"
	}
];
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user, isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		await logout();
		setOpen(false);
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex min-w-0 items-center gap-3",
				onClick: () => setOpen(false),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glow)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-display text-base font-bold",
						children: "InterviewAI"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs text-muted-foreground sm:block",
						children: "Preparation Assistant"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 lg:flex",
						children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							activeOptions: { exact: link.to === "/" },
							className: "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-primary",
							children: link.label
						}, link.to))
					}),
					isAuthenticated && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg bg-secondary px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-foreground",
								children: user.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: handleLogout,
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sign Out"]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Sign In"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "hero",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								children: "Get Started"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "lg:hidden",
						"aria-label": open ? "Close navigation" : "Open navigation",
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("overflow-hidden border-t border-border/70 transition-all duration-300 lg:hidden", open ? "max-h-96" : "max-h-0 border-transparent"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6",
				children: [links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					activeOptions: { exact: link.to === "/" },
					onClick: () => setOpen(false),
					className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary data-[status=active]:bg-secondary data-[status=active]:text-primary",
					children: link.label
				}, link.to)), isAuthenticated && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 border-t border-border/70" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-foreground",
							children: user.name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "justify-start gap-2",
						onClick: handleLogout,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sign Out"]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 border-t border-border/70" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						className: "justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setOpen(false),
							children: "Sign In"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "hero",
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							onClick: () => setOpen(false),
							children: "Get Started"
						})
					})
				] })]
			})
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-D0r1aInB.css";
/**
* Report an error to the console (and optionally to an external service).
*
* @param error   - The error to report (any value, not just Error instances).
* @param context - Optional key/value bag for debugging context (route, boundary, etc.).
*/
function reportError(error, context = {}) {
	const message = formatErrorMessage(error);
	if (Object.keys(context).length > 0) console.error("[InterviewAI]", message, context);
	else console.error("[InterviewAI]", message);
}
function formatErrorMessage(error) {
	if (error instanceof Response) return `HTTP Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.stack ?? `${error.name}: ${error.message}`;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "InterviewAI — AI Interview Preparation Assistant" },
			{
				name: "description",
				content: "Practise AI-powered mock interviews with instant evaluation, personalised feedback and a full score report."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	ssr: false,
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-screen w-full flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})
		] })
	});
}
var $$splitComponentImporter$6 = () => import("./routes-CrQce-vR.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "InterviewAI — AI Interview Preparation Assistant" },
		{
			name: "description",
			content: "Run AI-powered mock interviews in Python, SQL, ML, AI, Data Structures and HR. Get instant evaluation, personalised feedback and a score report."
		},
		{
			property: "og:title",
			content: "AI Interview Preparation Assistant"
		},
		{
			property: "og:description",
			content: "AI-generated questions, voice or text answers, instant AI evaluation and a full interview score report."
		}
	] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./evaluation-RJZkEDHM.mjs");
var Route$5 = createFileRoute("/evaluation")({
	head: () => ({ meta: [
		{ title: "Answer Evaluation — InterviewAI" },
		{
			name: "description",
			content: "See your AI evaluation: overall score, accuracy, clarity, technical knowledge, communication skills, strengths and suggestions."
		},
		{
			property: "og:title",
			content: "Answer Evaluation — InterviewAI"
		},
		{
			property: "og:description",
			content: "AI scoring across accuracy, clarity, technical knowledge and communication."
		}
	] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./interview-D3H4QfC5.mjs");
var Route$4 = createFileRoute("/interview")({
	head: () => ({ meta: [
		{ title: "Mock Interview — InterviewAI" },
		{
			name: "description",
			content: "Answer AI-generated interview questions by voice or text with a live timer, progress bar and question navigation."
		},
		{
			property: "og:title",
			content: "Mock Interview — InterviewAI"
		},
		{
			property: "og:description",
			content: "Answer AI-generated interview questions with a live timer and instant submission."
		}
	] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./login-BqDRlwCF.mjs");
var Route$3 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign In — InterviewAI" }, {
		name: "description",
		content: "Sign in to InterviewAI to continue your AI-powered mock interview practice."
	}] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./register-qwlKZWGw.mjs");
var Route$2 = createFileRoute("/register")({
	head: () => ({ meta: [{ title: "Create Account — InterviewAI" }, {
		name: "description",
		content: "Sign up for InterviewAI to start practicing AI-powered mock interviews."
	}] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./report-DrCYZccn.mjs");
var Route$1 = createFileRoute("/report")({
	head: () => ({ meta: [
		{ title: "Final Interview Report — InterviewAI" },
		{
			name: "description",
			content: "Your final interview report: questions answered, average score, strong and weak topics, and overall AI feedback."
		},
		{
			property: "og:title",
			content: "Final Interview Report — InterviewAI"
		},
		{
			property: "og:description",
			content: "Average score, strong topics, weak topics and overall AI feedback."
		}
	] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./setup-DoFrLxhe.mjs");
var Route = createFileRoute("/setup")({
	head: () => ({ meta: [
		{ title: "Interview Setup — InterviewAI" },
		{
			name: "description",
			content: "Choose your interview category, difficulty level and number of questions before starting your AI mock interview."
		},
		{
			property: "og:title",
			content: "Interview Setup — InterviewAI"
		},
		{
			property: "og:description",
			content: "Configure category, difficulty and question count for your AI mock interview."
		}
	] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	EvaluationRoute: Route$5.update({
		id: "/evaluation",
		path: "/evaluation",
		getParentRoute: () => Route$7
	}),
	InterviewRoute: Route$4.update({
		id: "/interview",
		path: "/interview",
		getParentRoute: () => Route$7
	}),
	LoginRoute: Route$3.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$7
	}),
	RegisterRoute: Route$2.update({
		id: "/register",
		path: "/register",
		getParentRoute: () => Route$7
	}),
	ReportRoute: Route$1.update({
		id: "/report",
		path: "/report",
		getParentRoute: () => Route$7
	}),
	SetupRoute: Route.update({
		id: "/setup",
		path: "/setup",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Button as a, api as i, RequireAuth as n, buttonVariants as o, useAuth as r, cn as s, router_exports as t };
