from enum import Enum
from pydantic import BaseModel, Field, constr, conint


class Category(str, Enum):
    Python = "Python"
    SQL = "SQL"
    Machine_Learning = "Machine Learning"
    Artificial_Intelligence = "Artificial Intelligence"
    Data_Analytics = "Data Analytics"
    Data_Structures = "Data Structures"
    HR = "HR"


class Difficulty(str, Enum):
    Easy = "Easy"
    Medium = "Medium"
    Hard = "Hard"


class InterviewStartRequest(BaseModel):
    category: Category
    difficulty: Difficulty
    number_of_questions: int = Field(..., alias="number_of_questions")


class InterviewStartResponse(BaseModel):
    session_id: str
    category: Category
    difficulty: Difficulty
    number_of_questions: int
    status: str = "started"


class InterviewQuestionResponse(BaseModel):
    session_id: str
    question_number: int
    total_questions: int
    question: str


class AnswerSubmissionRequest(BaseModel):
    session_id: constr(strip_whitespace=True, min_length=1)
    question_number: conint(ge=1)
    question: constr(strip_whitespace=True, min_length=1)
    answer: constr(strip_whitespace=True, min_length=1)


class AnswerSubmissionResponse(BaseModel):
    status: str
    message: str
    session_id: str
    question_number: int


class EvaluationRequest(BaseModel):
    session_id: constr(strip_whitespace=True, min_length=1)
    question_number: conint(ge=1)
    question: constr(strip_whitespace=True, min_length=1)
    answer: constr(strip_whitespace=True, min_length=1)


class EvaluationResponse(BaseModel):
    score: int
    accuracy: int
    technical_knowledge: int
    relevance: int
    clarity: int
    completeness: int
    strengths: list
    weaknesses: list
    suggestions: list
    overall_feedback: str


class ScoreResponse(BaseModel):
    session_id: str
    total_questions: int
    average_score: float
    accuracy: float
    technical_knowledge: float
    clarity: float
    completeness: float
    question_scores: list


class AnswerHistory(BaseModel):
    answer_id: int
    answer_text: str | None
    score: int | None
    accuracy: int | None
    technical_knowledge: int | None
    clarity: int | None
    completeness: int | None
    feedback: str | None
    created_at: str | None


class QuestionHistory(BaseModel):
    question_id: int
    question_number: int
    question_text: str
    answers: list[AnswerHistory]


class InterviewHistoryResponse(BaseModel):
    session_id: str
    category: Category
    difficulty: Difficulty
    number_of_questions: int
    created_at: str | None
    completed_at: str | None
    questions: list[QuestionHistory]


class BreakdownItem(BaseModel):
    label: str
    score: float


class InterviewReportResponse(BaseModel):
    session_id: str
    total_questions: int
    questions_answered: int
    average_score: float
    accuracy: float
    technical_knowledge: float
    clarity: float
    completeness: float
    breakdown: list[BreakdownItem]
    strong_areas: list[str]
    weak_areas: list[str]
    recommendations: list[str]
    overall_feedback: str
