import { Link } from "@tanstack/react-router";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/setup", label: "Setup" },
  { to: "/interview", label: "Interview" },
  { to: "/evaluation", label: "Evaluation" },
  { to: "/report", label: "Report" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Brain className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold">
              InterviewAI
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Preparation Assistant
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <Link to="/setup">Start Interview</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/70 transition-all duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0 border-transparent",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary data-[status=active]:bg-secondary data-[status=active]:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="hero" className="mt-2 sm:hidden">
            <Link to="/setup" onClick={() => setOpen(false)}>
              Start Interview
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
