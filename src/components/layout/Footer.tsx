import { Link } from "@tanstack/react-router";
import { Brain, Code2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-card/50 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glow)]">
              <Brain className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold">InterviewAI</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            AI-powered mock interviews with instant evaluation, personalised feedback, and complete score analytics.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur">
            <Code2 className="h-3.5 w-3.5 text-primary" />
            <span>Designed &amp; Developed by</span>
            <span className="font-semibold text-primary">Sundharapriya</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Practice</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/setup" className="transition-colors hover:text-primary">
                Interview setup
              </Link>
            </li>
            <li>
              <Link to="/interview" className="transition-colors hover:text-primary">
                Mock interview
              </Link>
            </li>
            <li>
              <Link to="/evaluation" className="transition-colors hover:text-primary">
                Answer evaluation
              </Link>
            </li>
            <li>
              <Link to="/report" className="transition-colors hover:text-primary">
                Final report
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Topics</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Python &amp; SQL</li>
            <li>Machine Learning &amp; AI</li>
            <li>Data Analytics &amp; Engineering</li>
            <li>HR &amp; Behavioural</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-6 text-center text-xs text-muted-foreground">
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
          <span>© {new Date().getFullYear()} InterviewAI. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1">
            Crafted with <Heart className="h-3 w-3 fill-rose-500 text-rose-500 inline" /> by <strong className="font-semibold text-foreground">Sundharapriya</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
