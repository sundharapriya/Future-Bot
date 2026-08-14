import { r as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Clock, I as ArrowRight, N as Check, h as Mic, p as Send, u as Square } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, i as api, n as RequireAuth, s as cn } from "./router-Cq21FpBk.mjs";
import { a as saveSession, i as loadSession, n as LoadingSpinner, t as DEFAULT_SESSION } from "./interview-session-DInflYuZ.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as Badge, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./badge-DoKBqgSk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/interview-D3S0UGcS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function formatTime(seconds) {
	return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
}
function InterviewPage() {
	const navigate = useNavigate();
	const [session, setSession] = (0, import_react.useState)(DEFAULT_SESSION);
	const [index, setIndex] = (0, import_react.useState)(1);
	const [question, setQuestion] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)([]);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [recordingError, setRecordingError] = (0, import_react.useState)(null);
	const [transcribing, setTranscribing] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [lastEvaluation, setLastEvaluation] = (0, import_react.useState)(null);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const recordedChunksRef = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		setSession(loadSession() ?? DEFAULT_SESSION);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		if (!session.sessionId) {
			setLoading(false);
			return;
		}
		setLoading(true);
		api.getQuestion(session.sessionId).then((data) => {
			if (cancelled) return;
			setQuestion(data);
			setAnswer(answers[index] ?? "");
			setElapsed(0);
		}).catch((error) => {
			if (cancelled) return;
			toast.error(error instanceof Error ? error.message : "Unable to load the question.");
		}).finally(() => !cancelled && setLoading(false));
		return () => {
			cancelled = true;
		};
	}, [index, session]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setElapsed((v) => v + 1), 1e3);
		return () => window.clearInterval(id);
	}, [index]);
	const progress = (0, import_react.useMemo)(() => Math.round((index - 1) / session.numQuestions * 100), [index, session.numQuestions]);
	const questionTimeLimitSeconds = (difficulty) => difficulty === "Hard" ? 180 : difficulty === "Medium" ? 150 : 120;
	const isVoiceSupported = typeof window !== "undefined" && "MediaRecorder" in window;
	const isLast = index >= session.numQuestions;
	const handleSubmit = async () => {
		if (submitting) return;
		if (!answer.trim()) {
			toast.error("Please write or record an answer first.");
			return;
		}
		setSubmitting(true);
		try {
			await api.submitAnswer({
				session_id: session.sessionId,
				question_number: index,
				question: question?.question ?? "",
				answer
			});
			const evaluation = await api.evaluateAnswer({
				session_id: session.sessionId,
				question_number: index,
				question: question?.question ?? "",
				answer
			});
			setLastEvaluation(evaluation);
			saveSession({
				...session,
				lastEvaluation: evaluation
			});
			setAnswers((prev) => ({
				...prev,
				[index]: answer
			}));
			setSubmitted((prev) => prev.includes(index) ? prev : [...prev, index]);
			toast.success("Answer submitted", { description: "The AI has evaluated your response." });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Unable to submit and evaluate your answer. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};
	const handleNext = () => {
		if (!submitted.includes(index)) {
			setConfirmOpen(true);
			return;
		}
		goNext();
	};
	const handleVoiceToggle = async () => {
		if (!isVoiceSupported) {
			toast.error("Voice recording is not supported in this browser.");
			return;
		}
		if (recording) {
			mediaRecorderRef.current?.stop();
			setRecording(false);
			return;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const recorder = new MediaRecorder(stream);
			recordedChunksRef.current = [];
			recorder.ondataavailable = (event) => {
				if (event.data.size > 0) recordedChunksRef.current.push(event.data);
			};
			recorder.onstop = async () => {
				stream.getTracks().forEach((track) => track.stop());
				const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
				const file = new File([blob], "speech.webm", { type: "audio/webm" });
				setTranscribing(true);
				try {
					const response = await api.transcribeSpeech(file);
					setAnswer(response.text);
					toast.success("Speech transcribed", { description: "Your voice answer has been converted to text." });
				} catch (error) {
					toast.error(error instanceof Error ? error.message : "Voice transcription failed. Please try again.");
				} finally {
					setTranscribing(false);
				}
			};
			mediaRecorderRef.current = recorder;
			recorder.start();
			setRecording(true);
			setRecordingError(null);
		} catch (error) {
			setRecordingError("Unable to access microphone. Please allow microphone access or use text input.");
			toast.error(error instanceof Error ? error.message : "Unable to start voice recording.");
		}
	};
	const goNext = () => {
		if (isLast) {
			navigate({ to: "/evaluation" });
			return;
		}
		setIndex((v) => v + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "truncate text-2xl font-bold sm:text-3xl",
						children: [session.category, " interview"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Question ",
							index,
							" of ",
							session.numQuestions,
							" · ",
							session.difficulty
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-bold tabular-nums",
						children: formatTime(elapsed)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progress, "%"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-gradient-primary",
						style: {
							width: `${progress}%`,
							transition: "width 0.6s ease"
						}
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Question navigation",
				className: "mt-6 flex flex-wrap gap-2",
				children: Array.from({ length: session.numQuestions }, (_, i) => i + 1).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setIndex(n),
					"aria-current": n === index,
					className: cn("grid h-9 w-9 place-items-center rounded-lg border text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5", n === index ? "border-primary bg-gradient-primary text-primary-foreground" : submitted.includes(n) ? "border-success/40 bg-success/10 text-success" : "border-border bg-card text-muted-foreground"),
					children: submitted.includes(n) && n !== index ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : n
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "surface-card mt-8 p-6 sm:p-8",
				children: loading || !question ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingSpinner, { label: "Loading the next question…" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-secondary text-secondary-foreground",
								children: session.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-accent/15 text-accent",
								children: session.difficulty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: ["Suggested time ", formatTime(questionTimeLimitSeconds(session.difficulty))]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 font-display text-xl leading-snug sm:text-2xl",
						children: question.question
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "answer",
								className: "text-sm font-semibold",
								children: "Your answer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "answer",
								value: answer,
								onChange: (event) => setAnswer(event.target.value),
								placeholder: "Structure your answer: definition, example, trade-offs, summary…",
								className: "mt-2 min-h-56 resize-y rounded-xl text-base"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [answer.trim() ? answer.trim().split(/\s+/).length : 0, " words"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: recording ? "destructive" : "outline",
							onClick: handleVoiceToggle,
							"aria-pressed": recording,
							children: [recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {}), recording ? "Stop recording" : "Answer with voice"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "accent",
								onClick: handleSubmit,
								disabled: submitting || transcribing,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}),
									" ",
									submitting ? "Submitting…" : transcribing ? "Transcribing…" : "Submit Answer"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "hero",
								onClick: handleNext,
								children: [
									isLast ? "Finish & evaluate" : "Next Question",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
								]
							})]
						})]
					}),
					recordingError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-destructive",
						children: recordingError
					}) : null
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirmOpen,
				onOpenChange: setConfirmOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Move on without submitting?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This answer has not been submitted yet, so it will not be evaluated or counted in your final score report." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep answering" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						setConfirmOpen(false);
						goNext();
					},
					children: "Continue anyway"
				})] })] })
			})
		]
	}) });
}
//#endregion
export { InterviewPage as component };
