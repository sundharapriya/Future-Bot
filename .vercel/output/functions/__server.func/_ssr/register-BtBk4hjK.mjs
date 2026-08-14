import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as EyeOff, E as Eye, _ as Mail, b as Lock, i as UserPlus, r as User } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, r as useAuth } from "./router-Cq21FpBk.mjs";
import { n as Label, t as Input } from "./label-D6i9vIi6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BtBk4hjK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegisterPage() {
	const navigate = useNavigate();
	const { register, loading } = useAuth();
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		preferredRole: "developer"
	});
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirmPassword, setShowConfirmPassword] = (0, import_react.useState)(false);
	const [validationErrors, setValidationErrors] = (0, import_react.useState)({});
	const validateForm = () => {
		const errors = {};
		if (!formData.name.trim()) errors.name = "Full name is required";
		else if (formData.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
		if (!formData.email) errors.email = "Email is required";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Please enter a valid email";
		if (!formData.password) errors.password = "Password is required";
		else if (formData.password.length < 8) errors.password = "Password must be at least 8 characters";
		if (!formData.confirmPassword) errors.confirmPassword = "Please confirm your password";
		else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		try {
			await register({
				name: formData.name,
				email: formData.email,
				password: formData.password,
				preferred_role: formData.preferredRole
			});
			toast.success("Account created!", { description: "Welcome to InterviewAI. Let's start practicing!" });
			navigate({ to: "/setup" });
		} catch (error) {
			const message = error instanceof Error ? error.message : "Sign up failed";
			toast.error("Sign up failed", { description: message });
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
								className: "rounded-full bg-gradient-to-br from-green-500 to-blue-600 p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-6 w-6 text-white" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight text-white",
							children: "Create Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate-400",
							children: "Join InterviewAI and start practicing AI-powered mock interviews"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										className: "text-sm font-medium text-slate-200",
										children: "Full Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "name",
											name: "name",
											type: "text",
											placeholder: "John Doe",
											value: formData.name,
											onChange: handleChange,
											className: "border-slate-700 bg-slate-800 pl-10 text-white placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20",
											disabled: loading
										})]
									}),
									validationErrors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-red-500",
										children: validationErrors.name
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										className: "text-sm font-medium text-slate-200",
										children: "Email Address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email",
											name: "email",
											type: "email",
											placeholder: "you@example.com",
											value: formData.email,
											onChange: handleChange,
											className: "border-slate-700 bg-slate-800 pl-10 text-white placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20",
											disabled: loading
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
										htmlFor: "password",
										className: "text-sm font-medium text-slate-200",
										children: "Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "password",
												name: "password",
												type: showPassword ? "text" : "password",
												placeholder: "••••••••",
												value: formData.password,
												onChange: handleChange,
												className: "border-slate-700 bg-slate-800 pl-10 pr-10 text-white placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20",
												disabled: loading
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPassword(!showPassword),
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400",
												tabIndex: -1,
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "confirmPassword",
										className: "text-sm font-medium text-slate-200",
										children: "Confirm Password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "confirmPassword",
												name: "confirmPassword",
												type: showConfirmPassword ? "text" : "password",
												placeholder: "••••••••",
												value: formData.confirmPassword,
												onChange: handleChange,
												className: "border-slate-700 bg-slate-800 pl-10 pr-10 text-white placeholder:text-slate-500 focus:border-green-500 focus:ring-green-500/20",
												disabled: loading
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowConfirmPassword(!showConfirmPassword),
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400",
												tabIndex: -1,
												children: showConfirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
											})
										]
									}),
									validationErrors.confirmPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-red-500",
										children: validationErrors.confirmPassword
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "role",
									className: "text-sm font-medium text-slate-200",
									children: "Preferred Role"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "role",
									name: "preferredRole",
									value: formData.preferredRole,
									onChange: handleChange,
									className: "w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/20",
									disabled: loading,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "developer",
											children: "Software Developer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "data_scientist",
											children: "Data Scientist"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "data_engineer",
											children: "Data Engineer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ml_engineer",
											children: "ML Engineer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "other",
											children: "Other"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: loading,
								className: "w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700",
								size: "lg",
								children: loading ? "Creating account..." : "Create Account"
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
										children: "Already have an account?"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "w-full border-slate-700 text-slate-300 hover:bg-slate-800",
								size: "lg",
								onClick: () => navigate({ to: "/login" }),
								children: "Sign In Instead"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-xs text-slate-500",
						children: [
							"By creating an account, you agree to our",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "text-green-400 hover:text-green-300",
								children: "Terms of Service"
							}),
							" ",
							"and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "text-green-400 hover:text-green-300",
								children: "Privacy Policy"
							})
						]
					})]
				})]
			})
		})]
	});
}
//#endregion
export { RegisterPage as component };
