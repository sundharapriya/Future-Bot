import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { s as cn } from "./router-CiGrT_2z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interview-session-CEBow4LZ.js
var import_jsx_runtime = require_jsx_runtime();
function LoadingSpinner({ className, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center gap-3 py-10", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-7 w-7 animate-spin text-primary" }),
			label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: label
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Loading"
			})
		]
	});
}
var KEY = "ai-interview-session";
function saveSession(session) {
	if (typeof window === "undefined") return;
	window.sessionStorage.setItem(KEY, JSON.stringify(session));
}
function loadSession() {
	if (typeof window === "undefined") return null;
	const raw = window.sessionStorage.getItem(KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function clearSession() {
	if (typeof window === "undefined") return;
	window.sessionStorage.removeItem(KEY);
}
var DEFAULT_SESSION = {
	sessionId: "demo-session",
	category: "Python",
	difficulty: "Medium",
	numQuestions: 5
};
//#endregion
export { saveSession as a, loadSession as i, LoadingSpinner as n, clearSession as r, DEFAULT_SESSION as t };
