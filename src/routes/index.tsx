import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Brain, ClipboardCheck, Mic, Sparkles, Target } from "lucide-react";

import heroImage from "@/assets/hero-interview.jpg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "InterviewAI — AI Interview Preparation Assistant" },
      {
        name: "description",
        content:
          "Run AI-powered mock interviews in Python, SQL, ML, AI, Data Structures and HR. Get instant evaluation, personalised feedback and a score report.",
      },
      { property: "og:title", content: "AI Interview Preparation Assistant" },
      {
        property: "og:description",
        content:
          "AI-generated questions, voice or text answers, instant AI evaluation and a full interview score report.",
      },
    ],
  }),
  component: HomePage,
});

const features = [
  {
    icon: Sparkles,
    title: "AI-generated questions",
    description:
      "Fresh, role-relevant questions generated for your chosen topic and difficulty on every run.",
  },
  {
    icon: Mic,
    title: "Voice and text answers",
    description: "Type your answer or speak it out loud, just like a real interview conversation.",
  },
  {
    icon: Brain,
    title: "AI evaluation",
    description: "Each answer is scored on accuracy, clarity, technical depth and communication.",
  },
  {
    icon: Target,
    title: "Personalised feedback",
    description:
      "Concrete strengths, weaknesses and suggestions written for the answer you actually gave.",
  },
  {
    icon: BarChart3,
    title: "Interview score report",
    description:
      "A final report with your average score, strong topics, weak topics and next steps.",
  },
  {
    icon: ClipboardCheck,
    title: "Six practice tracks",
    description: "Python, SQL, Machine Learning, Artificial Intelligence, Data Structures and HR.",
  },
];

const stats = [
  { value: "6", label: "Interview tracks" },
  { value: "3", label: "Difficulty levels" },
  { value: "5–15", label: "Questions per session" },
  { value: "4", label: "Scored dimensions" },
];

function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by AI evaluation
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
              AI Interview <span className="text-gradient">Preparation Assistant</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Practise with realistic, AI-conducted mock interviews. Answer by voice or text, get
              every response evaluated instantly, and finish with a personalised score report that
              shows exactly what to improve.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {isAuthenticated ? (
                <>
                  <Button asChild variant="hero" size="lg">
                    <Link to="/setup">
                      Start Interview <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/report">View sample report</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="hero" size="lg">
                    <Link to="/register">
                      Get Started <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold text-primary">{stat.value}</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-3xl" />
            <img
              src={heroImage}
              alt="Dashboard preview of an AI mock interview with question cards and a score ring"
              width={1280}
              height={960}
              className="relative w-full rounded-3xl border border-border shadow-[var(--shadow-elevated)]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to prepare</h2>
          <p className="mt-4 text-muted-foreground">
            A complete practice loop: generated questions, natural answering, objective evaluation
            and a report you can act on.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="surface-card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glow)]">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="surface-card flex flex-col items-center gap-6 p-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready for your mock interview?</h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Pick a topic, choose your difficulty and question count, and start answering in under a
            minute.
          </p>
          {isAuthenticated ? (
            <Button asChild variant="hero" size="lg">
              <Link to="/setup">
                Start Interview <ArrowRight />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="hero" size="lg">
              <Link to="/register">
                Get Started <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
