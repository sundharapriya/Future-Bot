import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Brain, I as ArrowRight, S as ListOrdered, T as Gauge, f as Server, k as Database, n as Users, w as Layers } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, i as api, n as RequireAuth, s as cn } from "./router-BbbMPwmW.mjs";
import { a as saveSession, n as LoadingSpinner } from "./interview-session-DRaYPRXl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/setup-DIweeWTm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var categories = [
	{
		name: "Python",
		icon: Brain,
		blurb: "Core language, OOP, idioms"
	},
	{
		name: "SQL",
		icon: Database,
		blurb: "Joins, tuning, modelling"
	},
	{
		name: "Machine Learning",
		icon: Gauge,
		blurb: "Modelling and evaluation"
	},
	{
		name: "Artificial Intelligence",
		icon: Brain,
		blurb: "LLMs, agents, ethics"
	},
	{
		name: "Data Analytics",
		icon: Layers,
		blurb: "Insights, visualisation, metrics"
	},
	{
		name: "Data Engineer",
		icon: Server,
		blurb: "Pipelines, warehouses, ETL"
	},
	{
		name: "HR Interview",
		icon: Users,
		blurb: "Behavioural and culture fit"
	}
];
var difficulties = [
	{
		name: "Easy",
		blurb: "Fundamentals and definitions"
	},
	{
		name: "Medium",
		blurb: "Applied, scenario-based"
	},
	{
		name: "Hard",
		blurb: "Senior-level depth and trade-offs"
	}
];
var questionCounts = [
	5,
	10,
	15
];
function SetupPage() {
	const navigate = useNavigate();
	const [category, setCategory] = (0, import_react.useState)("Python");
	const [difficulty, setDifficulty] = (0, import_react.useState)("Medium");
	const [numQuestions, setNumQuestions] = (0, import_react.useState)(5);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleStart = async () => {
		setLoading(true);
		try {
			const result = await api.startInterview({
				category,
				difficulty,
				number_of_questions: numQuestions
			});
			saveSession({
				sessionId: result.session_id,
				category,
				difficulty,
				numQuestions: result.number_of_questions
			});
			toast.success("Interview ready", { description: `${numQuestions} ${difficulty.toLowerCase()} ${category} questions.` });
			navigate({ to: "/interview" });
		} catch {
			toast.error("Could not start the interview. Please try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "h-3.5 w-3.5" }), " Step 1 of 3"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 text-3xl font-bold sm:text-4xl",
					children: "Interview setup"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted-foreground",
					children: "Tell the assistant what you want to practise. You can change any of this later by restarting the interview."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Interview category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: categories.map((item) => {
						const active = category === item.name;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": active,
							onClick: () => setCategory(item.name),
							className: cn("surface-card flex items-start gap-4 p-5 text-left", active && "border-primary ring-2 ring-primary/40"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors", active ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-primary"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-semibold",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-muted-foreground",
									children: item.blurb
								})]
							})]
						}, item.name);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Difficulty"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-3",
					children: difficulties.map((item) => {
						const active = difficulty === item.name;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": active,
							onClick: () => setDifficulty(item.name),
							className: cn("surface-card p-5 text-left", active && "border-accent ring-2 ring-accent/40"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-muted-foreground",
								children: item.blurb
							})]
						}, item.name);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Number of questions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-3",
					children: questionCounts.map((count) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": numQuestions === count,
						onClick: () => setNumQuestions(count),
						className: cn("min-w-24 rounded-xl border border-border bg-card px-6 py-4 text-center font-display text-lg font-bold shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5", numQuestions === count ? "border-primary bg-gradient-primary text-primary-foreground" : "text-foreground"),
						children: count
					}, count))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 surface-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Your session"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 truncate font-semibold",
						children: [
							category,
							" · ",
							difficulty,
							" · ",
							numQuestions,
							" questions"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "hero",
					size: "lg",
					onClick: handleStart,
					disabled: loading,
					children: [
						loading ? "Preparing…" : "Start Interview",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
					]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, { label: "Generating your questions…" }) : null
		]
	}) });
}
//#endregion
export { SetupPage as component };
