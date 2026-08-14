import { cn } from "@/lib/utils";

interface CircularScoreProps {
  /** Score value. */
  value: number;
  /** Maximum score, defaults to 10. */
  max?: number;
  size?: number;
  label?: string;
  className?: string;
}

export function CircularScore({
  value,
  max = 10,
  size = 180,
  label = "Overall score",
  className,
}: CircularScoreProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  const stroke = size * 0.085;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          role="img"
          aria-label={`${label}: ${value} of ${max}`}
        >
          <defs>
            <linearGradient id="score-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#score-gradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct)}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-bold text-gradient">{value.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">out of {max}</span>
        </div>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
