import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Brain, I as ArrowRight, P as ChartColumn, d as Sparkles, h as Mic, j as ClipboardCheck, l as Target } from "../_libs/lucide-react.mjs";
import { a as Button, r as useAuth } from "./router-Cq21FpBk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DEY83GMO.js
var import_jsx_runtime = require_jsx_runtime();
var hero_interview_default = "/assets/hero-interview-BAkCBDjm.jpg";
var features = [
	{
		icon: Sparkles,
		title: "AI-generated questions",
		description: "Fresh, role-relevant questions generated for your chosen topic and difficulty on every run."
	},
	{
		icon: Mic,
		title: "Voice and text answers",
		description: "Type your answer or speak it out loud, just like a real interview conversation."
	},
	{
		icon: Brain,
		title: "AI evaluation",
		description: "Each answer is scored on accuracy, clarity, technical depth and communication."
	},
	{
		icon: Target,
		title: "Personalised feedback",
		description: "Concrete strengths, weaknesses and suggestions written for the answer you actually gave."
	},
	{
		icon: ChartColumn,
		title: "Interview score report",
		description: "A final report with your average score, strong topics, weak topics and next steps."
	},
	{
		icon: ClipboardCheck,
		title: "Six practice tracks",
		description: "Python, SQL, Machine Learning, Artificial Intelligence, Data Structures and HR."
	}
];
var stats = [
	{
		value: "6",
		label: "Interview tracks"
	},
	{
		value: "3",
		label: "Difficulty levels"
	},
	{
		value: "5–15",
		label: "Questions per session"
	},
	{
		value: "4",
		label: "Scored dimensions"
	}
];
function HomePage() {
	const { isAuthenticated } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden bg-hero-glow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "Powered by AI evaluation"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl",
							children: ["AI Interview ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient",
								children: "Preparation Assistant"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base text-muted-foreground sm:text-lg",
							children: "Practise with realistic, AI-conducted mock interviews. Answer by voice or text, get every response evaluated instantly, and finish with a personalised score report that shows exactly what to improve."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-9 flex flex-wrap gap-3",
							children: isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "hero",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/setup",
									children: ["Start Interview ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/report",
									children: "View sample report"
								})
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "hero",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/register",
									children: ["Get Started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "Sign In"
								})
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4",
							children: stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "sr-only",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display text-2xl font-bold text-primary",
									children: stat.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-xs text-muted-foreground",
									children: stat.label
								})
							] }, stat.label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative animate-scale-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-6 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_interview_default,
						alt: "Dashboard preview of an AI mock interview with question cards and a score ring",
						width: 1280,
						height: 960,
						className: "relative w-full rounded-3xl border border-border shadow-[var(--shadow-elevated)]"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold sm:text-4xl",
					children: "Everything you need to prepare"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "A complete practice loop: generated questions, natural answering, objective evaluation and a report you can act on."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "surface-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glow)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(feature.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-lg font-semibold",
							children: feature.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: feature.description
						})
					]
				}, feature.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-col items-center gap-6 p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold sm:text-3xl",
						children: "Ready for your mock interview?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-sm text-muted-foreground sm:text-base",
						children: "Pick a topic, choose your difficulty and question count, and start answering in under a minute."
					}),
					isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "hero",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/setup",
							children: ["Start Interview ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "hero",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/register",
							children: ["Get Started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { HomePage as component };
