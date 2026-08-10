import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  value: number;
  className?: string;
}

/** Labelled metric bar used across evaluation and report screens. */
export function ScoreBar({ label, value, className }: ScoreBarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-medium">{label}</span>
        <span className="shrink-0 text-sm font-semibold text-primary">{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-primary"
          style={{ width: `${Math.max(0, Math.min(100, value))}%`, transition: "width 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </div>
    </div>
  );
}
