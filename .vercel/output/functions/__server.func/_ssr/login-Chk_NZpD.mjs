import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as EyeOff, E as Eye, _ as Mail, b as Lock, y as LogIn } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, r as useAuth } from "./router-CiGrT_2z.mjs";
import { n as Label, t as Input } from "./label-CGbbnfpM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Chk_NZpD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const { login, loading } = useAuth();
	const [formData, setFormData] = (0, import_react.useState)({
		email: "",
		password: ""
	});
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [validationErrors, setValidationErrors] = (0, import_react.useState)({});
	const validateForm = () => {
		const errors = {};
		if (!formData.email) errors.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Please enter a valid email";
		if (!formData.password) errors.password = "Password is required";
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		try {
			await login({
				email: formData.email,
				password: formData.password
			});
			toast.success("Welcome back!", { description: "You're now signed in. Ready to practice?" });
			navigate({ to: "/setup" });
		} catch (error) {
			const message = error instanceof Error ? error.message : "Sign in failed";
			toast.error("Sign in failed", { description: message });
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
		if (validationErrors[name]) setValidationErrors((prev) => ({
			...prev,
			[name]: ""
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex min-h-screen items-center justify-center px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-6 w-6 text-white" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight text-white",
							children: "Welcome back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate-400",
							children: "Sign in to continue your interview practice"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-5",
						id: "login-form",
						noValidate: true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "login-email",
										className: "text-sm font-medium text-slate-200",
										children: "Email Address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "login-email",
											name: "email",
											type: "email",
											placeholder: "you@example.com",
											value: formData.email,
											onChange: handleChange,
											className: "border-slate-700 bg-slate-800 pl-10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20",
											disabled: loading,
											autoComplete: "email"
										})]
									}),
									validationErrors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-red-500",
										children: validationErrors.email
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "login-password",
										className: "text-sm font-medium text-slate-200",
										children: "Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "login-password",
												name: "password",
												type: showPassword ? "text" : "password",
												placeholder: "••••••••",
												value: formData.password,
												onChange: handleChange,
												className: "border-slate-700 bg-slate-800 pl-10 pr-10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20",
												disabled: loading,
												autoComplete: "current-password"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPassword(!showPassword),
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400",
												tabIndex: -1,
												"aria-label": showPassword ? "Hide password" : "Show password",
												children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
											})
										]
									}),
									validationErrors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-red-500",
										children: validationErrors.password
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								id: "login-submit",
								type: "submit",
								disabled: loading,
								className: "w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
								size: "lg",
								children: loading ? "Signing in…" : "Sign In"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-slate-700" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative flex justify-center text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-slate-900 px-2 text-slate-400",
										children: "Don't have an account?"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "w-full border-slate-700 text-slate-300 hover:bg-slate-800",
								size: "lg",
								onClick: () => navigate({ to: "/register" }),
								children: "Create Account"
							})
						]
					})
				})]
			})
		})]
	});
}
//#endregion
export { LoginPage as component };
