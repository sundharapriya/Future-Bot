import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Brain, Database, Gauge, Layers, ListOrdered, Server, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { api, type Category, type Difficulty } from "@/lib/api";
import { saveSession } from "@/lib/interview-session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/setup")({
  head: () => ({
    meta: [
      { title: "Interview Setup — InterviewAI" },
      {
        name: "description",
        content:
          "Choose your interview category, difficulty level and number of questions before starting your AI mock interview.",
      },
      { property: "og:title", content: "Interview Setup — InterviewAI" },
      {
        property: "og:description",
        content: "Configure category, difficulty and question count for your AI mock interview.",
      },
    ],
  }),
  component: SetupPage,
});

const categories: { name: Category; icon: typeof Brain; blurb: string }[] = [
  { name: "Python", icon: Brain, blurb: "Core language, OOP, idioms" },
  { name: "SQL", icon: Database, blurb: "Joins, tuning, modelling" },
  { name: "Machine Learning", icon: Gauge, blurb: "Modelling and evaluation" },
  { name: "Artificial Intelligence", icon: Brain, blurb: "LLMs, agents, ethics" },
  { name: "Data Analytics", icon: Layers, blurb: "Insights, visualisation, metrics" },
  { name: "Data Engineer", icon: Server, blurb: "Pipelines, warehouses, ETL" },
  { name: "HR Interview", icon: Users, blurb: "Behavioural and culture fit" },
];

const difficulties: { name: Difficulty; blurb: string }[] = [
  { name: "Easy", blurb: "Fundamentals and definitions" },
  { name: "Medium", blurb: "Applied, scenario-based" },
  { name: "Hard", blurb: "Senior-level depth and trade-offs" },
];

const questionCounts = [5, 10, 15];

function SetupPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>("Python");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await api.startInterview({
        category,
        difficulty,
        number_of_questions: numQuestions,
      });
      saveSession({
        sessionId: result.session_id,
        category,
        difficulty,
        numQuestions: result.number_of_questions,
      });
      toast.success("Interview ready", {
        description: `${numQuestions} ${difficulty.toLowerCase()} ${category} questions.`,
      });
      navigate({ to: "/interview" });
    } catch {
      toast.error("Could not start the interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-primary">
          <ListOrdered className="h-3.5 w-3.5" /> Step 1 of 3
        </span>
        <h1 className="mt-5 text-3xl font-bold sm:text-4xl">Interview setup</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Tell the assistant what you want to practise. You can change any of this later by
          restarting the interview.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Interview category</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => {
            const active = category === item.name;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(item.name)}
                className={cn(
                  "surface-card flex items-start gap-4 p-5 text-left",
                  active && "border-primary ring-2 ring-primary/40",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors",
                    active
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-secondary text-primary",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{item.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{item.blurb}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Difficulty</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {difficulties.map((item) => {
            const active = difficulty === item.name;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={active}
                onClick={() => setDifficulty(item.name)}
                className={cn(
                  "surface-card p-5 text-left",
                  active && "border-accent ring-2 ring-accent/40",
                )}
              >
                <span className="block font-semibold">{item.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{item.blurb}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Number of questions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {questionCounts.map((count) => (
            <button
              key={count}
              type="button"
              aria-pressed={numQuestions === count}
              onClick={() => setNumQuestions(count)}
              className={cn(
                "min-w-24 rounded-xl border border-border bg-card px-6 py-4 text-center font-display text-lg font-bold shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5",
                numQuestions === count
                  ? "border-primary bg-gradient-primary text-primary-foreground"
                  : "text-foreground",
              )}
            >
              {count}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-12 surface-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Your session</p>
          <p className="mt-1 truncate font-semibold">
            {category} · {difficulty} · {numQuestions} questions
          </p>
        </div>
        <Button variant="hero" size="lg" onClick={handleStart} disabled={loading}>
          {loading ? "Preparing…" : "Start Interview"} <ArrowRight />
        </Button>
      </div>

      {loading ? <LoadingSpinner label="Generating your questions…" /> : null}
    </div>
  );
}
