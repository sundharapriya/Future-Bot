import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as Download, c as ThumbsUp, m as RotateCcw, o as TrendingUp, s as TrendingDown } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, i as api, n as RequireAuth } from "./router-BbbMPwmW.mjs";
import { n as ScoreBar, t as CircularScore } from "./ScoreBar-BIE8-7ag.mjs";
import { i as loadSession, n as LoadingSpinner, r as clearSession, t as DEFAULT_SESSION } from "./interview-session-DRaYPRXl.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as Badge, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./badge-Dvuc18-E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report-ClOmsG68.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportPage() {
	const navigate = useNavigate();
	const [data, setData] = (0, import_react.useState)(null);
	const [restartOpen, setRestartOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const session = loadSession() ?? DEFAULT_SESSION;
		api.getFinalReport(session.sessionId).then(setData).catch((error) => {
			toast.error(error instanceof Error ? error.message : "Unable to load your final report. Please try again.");
		});
	}, []);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl px-4 py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, { label: "Building your final report…" })
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold sm:text-4xl",
						children: "Final report"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "A summary of your whole session with the topics to keep and the topics to revisit."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "shrink-0 bg-secondary text-secondary-foreground",
					children: "Session complete"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card flex flex-col items-center justify-center p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularScore, {
						value: data.average_score,
						label: "Average score"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-bold text-foreground",
								children: data.questions_answered
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"questions answered"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card space-y-6 p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Performance by dimension"
					}), data.breakdown.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
						label: item.label,
						value: item.score
					}, item.label))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-lg font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-success" }), " Strong areas"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: data.strong_areas.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-success/12 px-3 py-1.5 text-xs font-medium text-success",
							children: item
						}, item))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-lg font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5 text-destructive" }), " Areas to improve"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: data.weak_areas.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-destructive/12 px-3 py-1.5 text-xs font-medium text-destructive",
							children: item
						}, item))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card mt-6 p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-lg font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "h-5 w-5 text-primary" }), " Overall feedback"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base",
					children: data.overall_feedback
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap justify-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "lg",
					onClick: () => toast.info("Report download will be handled by the backend."),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " Download Report"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "hero",
					size: "lg",
					onClick: () => setRestartOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Restart Interview"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: restartOpen,
				onOpenChange: setRestartOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Restart the interview?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This clears the current session and takes you back to setup so you can choose a new category and difficulty." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep this report" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						clearSession();
						setRestartOpen(false);
						navigate({ to: "/setup" });
					},
					children: "Restart"
				})] })] })
			})
		]
	}) });
}
//#endregion
export { ReportPage as component };
