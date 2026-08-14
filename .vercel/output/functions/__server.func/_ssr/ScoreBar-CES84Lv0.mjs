import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { s as cn } from "./router-Bfi8i8Rl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ScoreBar-CES84Lv0.js
var import_jsx_runtime = require_jsx_runtime();
function CircularScore({ value, max = 10, size = 180, label = "Overall score", className }) {
	const pct = Math.max(0, Math.min(1, value / max));
	const stroke = size * .085;
	const radius = (size - stroke) / 2;
	const circumference = 2 * Math.PI * radius;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			style: {
				width: size,
				height: size
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				className: "-rotate-90",
				role: "img",
				"aria-label": `${label}: ${value} of ${max}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "score-gradient",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--primary)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--accent)"
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: size / 2,
						cy: size / 2,
						r: radius,
						fill: "none",
						stroke: "var(--muted)",
						strokeWidth: stroke
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: size / 2,
						cy: size / 2,
						r: radius,
						fill: "none",
						stroke: "url(#score-gradient)",
						strokeWidth: stroke,
						strokeLinecap: "round",
						strokeDasharray: circumference,
						strokeDashoffset: circumference * (1 - pct),
						style: { transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-4xl font-bold text-gradient",
					children: value.toFixed(1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: ["out of ", max]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-muted-foreground",
			children: label
		})]
	});
}
/** Labelled metric bar used across evaluation and report screens. */
function ScoreBar({ label, value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate text-sm font-medium",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "shrink-0 text-sm font-semibold text-primary",
				children: [value, "%"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2.5 w-full overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-gradient-primary",
				style: {
					width: `${Math.max(0, Math.min(100, value))}%`,
					transition: "width 1s cubic-bezier(0.22,1,0.36,1)"
				}
			})
		})]
	});
}
//#endregion
export { ScoreBar as n, CircularScore as t };
