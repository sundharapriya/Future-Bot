import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Lightbulb, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

import { CircularScore } from "@/components/CircularScore";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ScoreBar } from "@/components/ScoreBar";
import { Button } from "@/components/ui/button";
import { api, type Evaluation, type ScoreResponse } from "@/lib/api";
import { RequireAuth } from "@/lib/auth-context";
import { DEFAULT_SESSION, loadSession, type InterviewSession } from "@/lib/interview-session";

export const Route = createFileRoute("/evaluation")({
  head: () => ({
    meta: [
      { title: "Answer Evaluation — InterviewAI" },
      {
        name: "description",
        content:
          "See your AI evaluation: overall score, accuracy, clarity, technical knowledge, communication skills, strengths and suggestions.",
      },
      { property: "og:title", content: "Answer Evaluation — InterviewAI" },
      {
        property: "og:description",
        content: "AI scoring across accuracy, clarity, technical knowledge and communication.",
      },
    ],
  }),
  ssr: false,
  component: EvaluationPage,
});

function EvaluationPage() {
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [score, setScore] = useState<ScoreResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = loadSession() ?? DEFAULT_SESSION;
    if (session.lastEvaluation) {
      setEvaluation(session.lastEvaluation);
    }

    api
      .getScore(session.sessionId)
      .then((response) => setScore(response))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
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

  if (loading && !hasData) {
    return (
      <RequireAuth>
      <div className="mx-auto max-w-5xl px-4 py-24">
        <LoadingSpinner label="The AI is evaluating your answers…" />
      </div>
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">Your evaluation</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Scored on how accurate, clear, technically deep and well-communicated your answers were.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="surface-card flex flex-col items-center justify-center p-8">
          <CircularScore value={overallScore} />
          <p className="mt-4 text-center text-sm text-muted-foreground">Overall score</p>
        </div>

        <div className="surface-card space-y-6 p-8">
          <h2 className="text-lg font-semibold">Score breakdown</h2>
          <ScoreBar label="Accuracy" value={accuracy} />
          <ScoreBar label="Clarity" value={clarity} />
          <ScoreBar label="Technical Knowledge" value={technicalKnowledge} />
          <ScoreBar label="Communication Skills" value={communicationSkills} />
          <ScoreBar label="Completeness" value={completeness} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="surface-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle2 className="h-5 w-5 text-success" /> Strengths
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {strengths.length ? (
              strengths.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">No strengths available yet.</li>
            )}
          </ul>
        </section>

        <section className="surface-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <TriangleAlert className="h-5 w-5 text-warning" /> Weaknesses
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {weaknesses.length ? (
              weaknesses.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">No weaknesses captured yet.</li>
            )}
          </ul>
        </section>

        <section className="surface-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Lightbulb className="h-5 w-5 text-accent" /> AI suggestions
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {suggestions.length ? (
              suggestions.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">No suggestions available yet.</li>
            )}
          </ul>
        </section>
      </div>

      <div className="mt-10 flex justify-end">
        <Button variant="hero" size="lg" onClick={() => navigate({ to: "/report" })}>
          Continue <ArrowRight />
        </Button>
      </div>
    </div>
    </RequireAuth>
  );
}
