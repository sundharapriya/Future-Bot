import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Lightbulb, I as ArrowRight, M as CircleCheck, a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as Button, i as api, n as RequireAuth } from "./router-BbbMPwmW.mjs";
import { n as ScoreBar, t as CircularScore } from "./ScoreBar-BIE8-7ag.mjs";
import { i as loadSession, n as LoadingSpinner, t as DEFAULT_SESSION } from "./interview-session-DRaYPRXl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluation-Dz8mDonx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EvaluationPage() {
	const navigate = useNavigate();
	const [evaluation, setEvaluation] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const session = loadSession() ?? DEFAULT_SESSION;
		if (session.lastEvaluation) setEvaluation(session.lastEvaluation);
		api.getScore(session.sessionId).then((response) => setScore(response)).catch((error) => {
			console.error(error);
		}).finally(() => setLoading(false));
	}, []);
	const hasData = !!evaluation || !!score;
	const overallScore = score?.average_score ?? evaluation?.score ?? 0;
	const accuracy = score?.accuracy ?? evaluation?.accuracy ?? 0;
	const clarity = score?.clarity ?? evaluation?.clarity ?? 0;
	const technicalKnowledge = score?.technical_knowledge ?? evaluation?.technical_knowledge ?? 0;
	const communicationSkills = evaluation?.relevance ?? 0;
	const completeness = score?.completeness ?? evaluation?.completeness ?? 0;
	const strengths = evaluation?.strengths ?? [];
	const weaknesses = evaluation?.weaknesses ?? [];
	const suggestions = evaluation?.suggestions ?? [];
	if (loading && !hasData) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl px-4 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, { label: "The AI is evaluating your answers…" })
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold sm:text-4xl",
				children: "Your evaluation"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: "Scored on how accurate, clear, technically deep and well-communicated your answers were."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card flex flex-col items-center justify-center p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularScore, { value: overallScore }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-sm text-muted-foreground",
						children: "Overall score"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card space-y-6 p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Score breakdown"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
							label: "Accuracy",
							value: accuracy
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
							label: "Clarity",
							value: clarity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
							label: "Technical Knowledge",
							value: technicalKnowledge
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
							label: "Communication Skills",
							value: communicationSkills
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
							label: "Completeness",
							value: completeness
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-lg font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-success" }), " Strengths"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 text-sm text-muted-foreground",
							children: strengths.length ? strengths.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" }), item]
							}, item)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted-foreground",
								children: "No strengths available yet."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-lg font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-warning" }), " Weaknesses"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 text-sm text-muted-foreground",
							children: weaknesses.length ? weaknesses.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" }), item]
							}, item)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted-foreground",
								children: "No weaknesses captured yet."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-lg font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "h-5 w-5 text-accent" }), " AI suggestions"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 text-sm text-muted-foreground",
							children: suggestions.length ? suggestions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" }), item]
							}, item)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted-foreground",
								children: "No suggestions available yet."
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "hero",
					size: "lg",
					onClick: () => navigate({ to: "/report" }),
					children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				})
			})
		]
	}) });
}
//#endregion
export { EvaluationPage as component };
