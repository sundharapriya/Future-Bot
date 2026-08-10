/**
 * REST client for the Python backend.
 *
 * The frontend uses a backend base URL from environment configuration.
 */

export const API_BASE_URL =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "http://localhost:8000";

export type Category =
  | "Python"
  | "SQL"
  | "Machine Learning"
  | "Artificial Intelligence"
  | "Data Analytics"
  | "Data Engineer"
  | "HR Interview";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface StartInterviewRequest {
  category: Category;
  difficulty: Difficulty;
  number_of_questions: number;
}

export interface StartInterviewResponse {
  session_id: string;
  category: Category;
  difficulty: Difficulty;
  number_of_questions: number;
  status: string;
}

export interface Question {
  session_id: string;
  question_number: number;
  total_questions: number;
  question: string;
}

export interface SubmitAnswerRequest {
  session_id: string;
  question_number: number;
  question: string;
  answer: string;
}

export interface Evaluation {
  score: number;
  accuracy: number;
  technical_knowledge: number;
  relevance: number;
  clarity: number;
  completeness: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overall_feedback: string;
}

export interface ScoreResponse {
  session_id: string;
  total_questions: number;
  average_score: number;
  accuracy: number;
  technical_knowledge: number;
  clarity: number;
  completeness: number;
  question_scores: { label: string; score: number }[];
}

export interface FinalReport {
  session_id: string;
  total_questions: number;
  questions_answered: number;
  average_score: number;
  accuracy: number;
  technical_knowledge: number;
  clarity: number;
  completeness: number;
  breakdown: { label: string; score: number }[];
  strong_areas: string[];
  weak_areas: string[];
  recommendations: string[];
  overall_feedback: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const headers = new Headers(init?.headers as HeadersInit | undefined);
    const body = init?.body;
    if (body && !(body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
    });

    const text = await response.text();
    if (!response.ok) {
      let detail = response.statusText;
      try {
        const payload = text ? JSON.parse(text) : null;
        if (payload && typeof payload === "object") {
          detail = payload.detail || payload.message || detail;
        }
      } catch {
        // ignore parse failure
      }
      throw new Error(`Request failed: ${response.status} ${detail}`);
    }

    if (!text) {
      return {} as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown network error");
  }
}

export const api = {
  startInterview: (body: StartInterviewRequest) =>
    request<StartInterviewResponse>("/api/interview/start", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getQuestion: (session_id: string) =>
    request<Question>(`/api/interview/question/${encodeURIComponent(session_id)}`, {
      method: "GET",
    }),

  submitAnswer: (body: SubmitAnswerRequest) =>
    request<{ status: string; message: string; session_id: string; question_number: number }>(
      "/api/interview/answer",
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    ),

  evaluateAnswer: (body: SubmitAnswerRequest) =>
    request<Evaluation>("/api/interview/evaluate", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getScore: (sessionId: string) =>
    request<ScoreResponse>(`/api/interview/score/${encodeURIComponent(sessionId)}`, {
      method: "GET",
    }),

  getFinalReport: (sessionId: string) =>
    request<FinalReport>(`/api/interview/report/${encodeURIComponent(sessionId)}`, {
      method: "GET",
    }),

  transcribeSpeech: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return request<{ status: string; text: string }>("/api/speech/transcribe", {
      method: "POST",
      body: form,
    });
  },
};
