import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Mic, Send, Square } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api, type Evaluation, type Question } from "@/lib/api";
import { RequireAuth } from "@/lib/auth-context";
import {
  DEFAULT_SESSION,
  loadSession,
  saveSession,
  type InterviewSession,
} from "@/lib/interview-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "Mock Interview — InterviewAI" },
      {
        name: "description",
        content:
          "Answer AI-generated interview questions by voice or text with a live timer, progress bar and question navigation.",
      },
      { property: "og:title", content: "Mock Interview — InterviewAI" },
      {
        property: "og:description",
        content:
          "Answer AI-generated interview questions with a live timer and instant submission.",
      },
    ],
  }),
  ssr: false,
  component: InterviewPage,
});

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function InterviewPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<InterviewSession>(DEFAULT_SESSION);
  const [index, setIndex] = useState(1);
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState<number[]>([]);
  const [recording, setRecording] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastEvaluation, setLastEvaluation] = useState<Evaluation | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    setSession(loadSession() ?? DEFAULT_SESSION);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!session.sessionId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    api
      .getQuestion(session.sessionId)
      .then((data) => {
        if (cancelled) return;
        setQuestion(data);
        setAnswer(answers[index] ?? "");
        setElapsed(0);
      })
      .catch((error) => {
        if (cancelled) return;
        toast.error(error instanceof Error ? error.message : "Unable to load the question.");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, session]);

  useEffect(() => {
    const id = window.setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [index]);

  const progress = useMemo(
    () => Math.round(((index - 1) / session.numQuestions) * 100),
    [index, session.numQuestions],
  );

  const questionTimeLimitSeconds = (difficulty: InterviewSession["difficulty"]) =>
    difficulty === "Hard" ? 180 : difficulty === "Medium" ? 150 : 120;

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
        answer,
      });

      const evaluation = await api.evaluateAnswer({
        session_id: session.sessionId,
        question_number: index,
        question: question?.question ?? "",
        answer,
      });

      setLastEvaluation(evaluation);
      saveSession({ ...session, lastEvaluation: evaluation });
      setAnswers((prev) => ({ ...prev, [index]: answer }));
      setSubmitted((prev) => (prev.includes(index) ? prev : [...prev, index]));
      toast.success("Answer submitted", {
        description: "The AI has evaluated your response.",
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to submit and evaluate your answer. Please try again.",
      );
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
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "speech.webm", { type: "audio/webm" });
        setTranscribing(true);
        try {
          const response = await api.transcribeSpeech(file);
          setAnswer(response.text);
          toast.success("Speech transcribed", {
            description: "Your voice answer has been converted to text.",
          });
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Voice transcription failed. Please try again.",
          );
        } finally {
          setTranscribing(false);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setRecordingError(null);
    } catch (error) {
      setRecordingError(
        "Unable to access microphone. Please allow microphone access or use text input.",
      );
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

  return (
    <RequireAuth>
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold sm:text-3xl">{session.category} interview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Question {index} of {session.numQuestions} · {session.difficulty}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-[var(--shadow-card)]">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-display text-sm font-bold tabular-nums">{formatTime(elapsed)}</span>
        </div>
      </header>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-primary"
            style={{ width: `${progress}%`, transition: "width 0.6s ease" }}
          />
        </div>
      </div>

      <nav aria-label="Question navigation" className="mt-6 flex flex-wrap gap-2">
        {Array.from({ length: session.numQuestions }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setIndex(n)}
            aria-current={n === index}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-lg border text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5",
              n === index
                ? "border-primary bg-gradient-primary text-primary-foreground"
                : submitted.includes(n)
                  ? "border-success/40 bg-success/10 text-success"
                  : "border-border bg-card text-muted-foreground",
            )}
          >
            {submitted.includes(n) && n !== index ? <Check className="h-4 w-4" /> : n}
          </button>
        ))}
      </nav>

      <section className="surface-card mt-8 p-6 sm:p-8">
        {loading || !question ? (
          <LoadingSpinner label="Loading the next question…" />
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-secondary text-secondary-foreground">{session.category}</Badge>
              <Badge className="bg-accent/15 text-accent">{session.difficulty}</Badge>
              <span className="text-xs text-muted-foreground">
                Suggested time {formatTime(questionTimeLimitSeconds(session.difficulty))}
              </span>
            </div>
            <h2 className="mt-5 font-display text-xl leading-snug sm:text-2xl">
              {question.question}
            </h2>

            <div className="mt-7">
              <label htmlFor="answer" className="text-sm font-semibold">
                Your answer
              </label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Structure your answer: definition, example, trade-offs, summary…"
                className="mt-2 min-h-56 resize-y rounded-xl text-base"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {answer.trim() ? answer.trim().split(/\s+/).length : 0} words
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant={recording ? "destructive" : "outline"}
                onClick={handleVoiceToggle}
                aria-pressed={recording}
              >
                {recording ? <Square /> : <Mic />}
                {recording ? "Stop recording" : "Answer with voice"}
              </Button>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="accent"
                  onClick={handleSubmit}
                  disabled={submitting || transcribing}
                >
                  <Send />{" "}
                  {submitting ? "Submitting…" : transcribing ? "Transcribing…" : "Submit Answer"}
                </Button>
                <Button variant="hero" onClick={handleNext}>
                  {isLast ? "Finish & evaluate" : "Next Question"} <ArrowRight />
                </Button>
              </div>
            </div>
            {recordingError ? (
              <p className="mt-4 text-sm text-destructive">{recordingError}</p>
            ) : null}
          </>
        )}
      </section>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Move on without submitting?</AlertDialogTitle>
            <AlertDialogDescription>
              This answer has not been submitted yet, so it will not be evaluated or counted in your
              final score report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep answering</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmOpen(false);
                goNext();
              }}
            >
              Continue anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </RequireAuth>
  );
}
