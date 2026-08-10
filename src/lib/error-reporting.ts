/**
 * Generic, production-grade error reporting utility.
 *
 * Centralises all unhandled error reporting in one place so you can swap in
 * any third-party monitoring service (Sentry, Datadog, etc.) by editing this
 * single file.
 *
 * Usage:
 *   import { reportError } from "@/lib/error-reporting";
 *   reportError(error, { boundary: "my_component" });
 */

export type ErrorContext = Record<string, unknown>;

/**
 * Report an error to the console (and optionally to an external service).
 *
 * @param error   - The error to report (any value, not just Error instances).
 * @param context - Optional key/value bag for debugging context (route, boundary, etc.).
 */
export function reportError(error: unknown, context: ErrorContext = {}): void {
  const message = formatErrorMessage(error);
  const hasContext = Object.keys(context).length > 0;

  // Always log to the console so the developer sees it in every environment.
  if (hasContext) {
    console.error("[InterviewAI]", message, context);
  } else {
    console.error("[InterviewAI]", message);
  }

  // -----------------------------------------------------------------------
  // Plug in your external monitoring service here, for example:
  //
  //   if (typeof window !== "undefined") {
  //     Sentry.captureException(error, { extra: context });
  //   }
  // -----------------------------------------------------------------------
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatErrorMessage(error: unknown): string {
  if (error instanceof Response) {
    return `HTTP Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
  }
  if (error instanceof Error) {
    return error.stack ?? `${error.name}: ${error.message}`;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}
