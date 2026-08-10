import { Link } from "@tanstack/react-router";
import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-card/50 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <Brain className="h-4 w-4" />
            </span>
            <span className="font-display font-bold">InterviewAI</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            AI-powered mock interviews with instant evaluation, personalised feedback and a
            complete score report.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Practice</h3>
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
          <h3 className="text-sm font-semibold">Topics</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Python &amp; SQL</li>
            <li>Machine Learning &amp; AI</li>
            <li>Data Structures</li>
            <li>HR &amp; behavioural</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} InterviewAI. Built for interview practice.
      </div>
    </footer>
  );
}
