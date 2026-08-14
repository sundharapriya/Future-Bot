import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, RotateCcw, ThumbsUp, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CircularScore } from "@/components/CircularScore";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ScoreBar } from "@/components/ScoreBar";
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
import { api, type FinalReport } from "@/lib/api";
import { RequireAuth } from "@/lib/auth-context";
import { DEFAULT_SESSION, clearSession, loadSession } from "@/lib/interview-session";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Final Interview Report — InterviewAI" },
      {
        name: "description",
        content:
          "Your final interview report: questions answered, average score, strong and weak topics, and overall AI feedback.",
      },
      { property: "og:title", content: "Final Interview Report — InterviewAI" },
      {
        property: "og:description",
        content: "Average score, strong topics, weak topics and overall AI feedback.",
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<FinalReport | null>(null);
  const [restartOpen, setRestartOpen] = useState(false);

  useEffect(() => {
    const session = loadSession() ?? DEFAULT_SESSION;
    api
      .getFinalReport(session.sessionId)
      .then(setData)
      .catch((error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load your final report. Please try again.",
        );
      });
  }, []);

  if (!data) {
    return (
      <RequireAuth>
      <div className="mx-auto max-w-5xl px-4 py-24">
        <LoadingSpinner label="Building your final report…" />
      </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold sm:text-4xl">Final report</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A summary of your whole session with the topics to keep and the topics to revisit.
          </p>
        </div>
        <Badge className="shrink-0 bg-secondary text-secondary-foreground">Session complete</Badge>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="surface-card flex flex-col items-center justify-center p-8">
          <CircularScore value={data.average_score} label="Average score" />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <span className="font-display text-2xl font-bold text-foreground">
              {data.questions_answered}
            </span>
            <br />
            questions answered
          </p>
        </div>

        <div className="surface-card space-y-6 p-8">
          <h2 className="text-lg font-semibold">Performance by dimension</h2>
          {data.breakdown.map((item) => (
            <ScoreBar key={item.label} label={item.label} value={item.score} />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="surface-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5 text-success" /> Strong areas
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.strong_areas.map((item) => (
              <span
                key={item}
                className="rounded-full bg-success/12 px-3 py-1.5 text-xs font-medium text-success"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="surface-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <TrendingDown className="h-5 w-5 text-destructive" /> Areas to improve
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.weak_areas.map((item) => (
              <span
                key={item}
                className="rounded-full bg-destructive/12 px-3 py-1.5 text-xs font-medium text-destructive"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className="surface-card mt-6 p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ThumbsUp className="h-5 w-5 text-primary" /> Overall feedback
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {data.overall_feedback}
        </p>
      </section>

      <div className="mt-10 flex flex-wrap justify-end gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => toast.info("Report download will be handled by the backend.")}
        >
          <Download /> Download Report
        </Button>
        <Button variant="hero" size="lg" onClick={() => setRestartOpen(true)}>
          <RotateCcw /> Restart Interview
        </Button>
      </div>

      <AlertDialog open={restartOpen} onOpenChange={setRestartOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restart the interview?</AlertDialogTitle>
            <AlertDialogDescription>
              This clears the current session and takes you back to setup so you can choose a new
              category and difficulty.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep this report</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearSession();
                setRestartOpen(false);
                navigate({ to: "/setup" });
              }}
            >
              Restart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </RequireAuth>
  );
}
