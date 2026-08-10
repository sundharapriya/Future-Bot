import type { Category, Difficulty, Evaluation } from "./api";

/**
 * Lightweight client-side holder for the current interview selection.
 * Persisted in sessionStorage only so page reloads keep the UI usable —
 * no business logic lives here.
 */
export interface InterviewSession {
  sessionId: string;
  category: Category;
  difficulty: Difficulty;
  numQuestions: number;
  lastEvaluation?: Evaluation;
}

const KEY = "ai-interview-session";

export function saveSession(session: InterviewSession) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, JSON.stringify(session));
}

export function loadSession(): InterviewSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as InterviewSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
}

export const DEFAULT_SESSION: InterviewSession = {
  sessionId: "demo-session",
  category: "Python",
  difficulty: "Medium",
  numQuestions: 5,
};
