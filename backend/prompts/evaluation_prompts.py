def build_evaluation_prompt(question: str, answer: str, criteria: dict) -> str:
    # criteria is a dict describing required aspects
    crit_text = "\n".join(f"- {k}: {v}" for k, v in criteria.items())
    prompt = (
        "You are an expert interview grader. Evaluate the candidate's answer against the given criteria.\n"
        "Produce a JSON object with the following keys: score (0-10), accuracy, technical_knowledge, relevance, clarity, completeness, strengths (list of short strings), weaknesses (list), suggestions (list), overall_feedback (short string).\n"
        "Ensure numeric fields are integers between 0 and 10. Return only valid JSON — no commentary.\n\n"
        f"Question:\n{question}\n\nAnswer:\n{answer}\n\nCriteria:\n{crit_text}\n\nRespond in JSON only."
    )
    return prompt
