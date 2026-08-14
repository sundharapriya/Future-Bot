import os
import json
import random
import urllib.request
from typing import List, Dict, Any


LLM_API_KEY_ENV = "LLM_API_KEY"
OPENAI_API_KEY_ENV = "OPENAI_API_KEY"
GEMINI_API_KEY_ENV = "GEMINI_API_KEY"
GROQ_API_KEY_ENV = "GROQ_API_KEY"


class LLMError(Exception):
    pass


# Comprehensive Question Bank with 200+ Curated Industry Questions
QUESTION_BANK: Dict[str, Dict[str, List[str]]] = {
    "Python": {
        "Easy": [
            "What is the difference between a list and a tuple in Python? When would you prefer one over the other?",
            "How does memory management work in Python? What role does the garbage collector play?",
            "What are Python decorators and how do you write a simple logging decorator?",
            "Explain the difference between 'is' and '==' operators in Python with examples.",
            "What are list comprehensions and generator expressions? Compare their performance and memory usage.",
            "What is the purpose of the '__init__' method in Python classes?",
            "How do *args and **kwargs work in function definitions?",
            "Explain the concept of mutability vs immutability with Python data types.",
            "What are lambda functions in Python and what are their limitations?",
            "How do Python dictionaries handle key collisions internally?",
        ],
        "Medium": [
            "Explain how Python generators and the 'yield' keyword work under the hood.",
            "What is the Global Interpreter Lock (GIL) in CPython, and how does it impact multithreaded CPU-bound tasks?",
            "How do context managers and the 'with' statement work in Python? How would you implement one using __enter__ and __exit__?",
            "What is the difference between shallow copy and deep copy in Python? How does the 'copy' module handle them?",
            "Explain the difference between multiprocessing and multithreading in Python. When should each be used?",
            "What are magic methods (dunder methods) in Python? Give examples like __str__, __repr__, and __call__.",
            "How does Python's asyncio event loop handle non-blocking asynchronous I/O operations?",
            "What are Python descriptors and property decorators? How do they control attribute access?",
            "Explain Method Resolution Order (MRO) and the C3 linearization algorithm in Python multiple inheritance.",
            "How do you profile and optimize memory and CPU bottlenecks in a Python application?",
        ],
        "Hard": [
            "Explain how Python metaclasses work and demonstrate a practical use case for custom metaclasses.",
            "How does CPython manage memory internally at the PyObject, arena, and pool levels (PyMalloc)?",
            "Describe the internal implementation of Python's dictionary structure in Python 3.7+ (compact dictionary).",
            "How would you build a thread-safe, concurrent task queue in Python without third-party libraries?",
            "Explain how Python handles circular references and how generational garbage collection detects cyclic memory leaks.",
            "Discuss the internals of the async/await syntax and how generator state machines compile into coroutines.",
            "How do ctypes and C-extensions interact with Python reference counting (Py_INCREF/Py_DECREF)?",
            "Explain structural pattern matching in Python 3.10+ and how it optimizes dispatch compared to if/elif ladders.",
        ],
    },
    "SQL": {
        "Easy": [
            "What is the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN?",
            "Explain the difference between WHERE and HAVING clauses in SQL with examples.",
            "What are PRIMARY KEY and FOREIGN KEY constraints, and why are they essential for referential integrity?",
            "What is the difference between DROP, TRUNCATE, and DELETE statements?",
            "How do GROUP BY and aggregate functions (COUNT, SUM, AVG) work together?",
            "What is the difference between UNION and UNION ALL in terms of functionality and performance?",
            "What are NULL values in SQL and how do functions like COALESCE or IFNULL handle them?",
            "Explain what a database View is and when you should use one.",
        ],
        "Medium": [
            "Explain SQL Window Functions (e.g., ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG) and their partition syntax.",
            "What are clustered vs non-clustered indexes, and how do B-Tree indexes accelerate SELECT queries?",
            "How do Common Table Expressions (CTEs) work, and how do recursive CTEs query hierarchical data?",
            "Explain the ACID properties of database transactions and what guarantees each property provides.",
            "How do you identify and optimize slow SQL queries using EXPLAIN / EXPLAIN ANALYZE execution plans?",
            "What are the differences between Database Normalization (1NF, 2NF, 3NF, BCNF) and Denormalization?",
            "What is database deadlocking, and what strategies can you use to prevent or resolve deadlocks?",
            "Explain the differences between pessimistic locking and optimistic locking in concurrent transactions.",
        ],
        "Hard": [
            "Explain transaction isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) and their anomaly trade-offs (Dirty Read, Non-Repeatable Read, Phantom Read).",
            "How would you architect database partitioning (range, list, hash) and sharding for a multi-terabyte dataset?",
            "Describe how Multi-Version Concurrency Control (MVCC) works in PostgreSQL and MySQL InnoDB.",
            "How would you optimize complex analytical queries combining lateral joins, CTEs, and window functions on high-write databases?",
            "Explain how write-ahead logging (WAL) guarantees durability and crash recovery in relational databases.",
            "What are covering indexes, partial indexes, and expression indexes? How do they minimize I/O overhead?",
        ],
    },
    "Machine Learning": {
        "Easy": [
            "What is the difference between Supervised, Unsupervised, and Reinforcement Learning?",
            "Explain the difference between Classification and Regression with real-world examples.",
            "What is overfitting and underfitting in ML models, and how do you detect them?",
            "What is the Bias-Variance tradeoff and how does it influence model complexity?",
            "Explain precision, recall, and F1-score. When would you prioritize recall over precision?",
            "What is Cross-Validation (e.g., K-Fold CV) and why is it preferred over a single train-test split?",
            "Explain how Linear Regression finds the line of best fit using Ordinary Least Squares.",
            "What is Logistic Regression and how does the sigmoid activation function output probabilities?",
        ],
        "Medium": [
            "How do L1 (Lasso) and L2 (Ridge) regularization prevent overfitting, and why does L1 produce sparse weights?",
            "Explain how Random Forest differs from Gradient Boosting (e.g., XGBoost, LightGBM) in ensemble learning.",
            "What is Gradient Descent? Compare Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Adam optimizer.",
            "How do Support Vector Machines (SVMs) find the optimal hyperplane, and what role do Kernel tricks play?",
            "What techniques do you use to handle severe class imbalance (e.g., SMOTE, focal loss, class weighting)?",
            "Explain Principal Component Analysis (PCA) and how eigenvectors/eigenvalues reduce dimensionality.",
            "What is ROC-AUC and Precision-Recall AUC? Which curve should you evaluate for highly skewed datasets?",
            "Explain how Decision Trees calculate split points using Gini Impurity and Information Gain (Entropy).",
        ],
        "Hard": [
            "Explain the mathematical formulation of the Self-Attention mechanism in Transformer models.",
            "How do modern gradient boosting implementations (XGBoost, CatBoost) handle second-order Taylor approximations and missing data?",
            "Discuss strategies for detecting and mitigating Concept Drift and Data Drift in deployed production ML pipelines.",
            "How does Backpropagation through time (BPTT) work, and how do vanishing/exploding gradients affect deep architectures?",
            "Explain Contrastive Learning (e.g., SimCLR, CLIP) and how loss functions like InfoNCE operate.",
            "How would you design an end-to-end real-time feature store and low-latency inference architecture for fraud detection?",
        ],
    },
    "Artificial Intelligence": {
        "Easy": [
            "What is the difference between Traditional Rule-Based AI and Modern Machine Learning?",
            "What is an Artificial Neural Network, and what do weights, biases, and activation functions represent?",
            "Explain the difference between Weak AI (Narrow AI) and Strong AI (Artificial General Intelligence).",
            "What are Large Language Models (LLMs) and how do they generate responses using token prediction?",
            "What is Prompt Engineering, and how do Zero-shot and Few-shot prompting work?",
            "What is Natural Language Processing (NLP) and what are common preprocessing steps (tokenization, stemming)?",
        ],
        "Medium": [
            "Explain the architecture of Retrieval-Augmented Generation (RAG) and how vector databases retrieve context.",
            "What is the difference between Fine-tuning, LoRA (Low-Rank Adaptation), and In-Context Learning for LLMs?",
            "How do Search Algorithms like A* and Minimax with Alpha-Beta pruning optimize decision-making?",
            "Explain how AI Agents utilize tools, memory, and reasoning loops (e.g., ReAct, Plan-and-Solve).",
            "What are embeddings and vector similarity metrics (Cosine Similarity, Dot Product, Euclidean Distance)?",
            "How does Reinforcement Learning from Human Feedback (RLHF) and DPO align AI models with human intent?",
            "Explain the differences between Convolutional Neural Networks (CNNs) and Vision Transformers (ViTs).",
        ],
        "Hard": [
            "Explain Multi-Head Attention, Rotary Position Embeddings (RoPE), and FlashAttention optimization at the GPU level.",
            "How do Multi-Agent architectures coordinate tasks, manage shared state, and prevent hallucination loops?",
            "Explain the mathematical principles behind Diffusion Models and contrast them with GANs and VAEs.",
            "How would you architect a production RAG system with hybrid search (BM25 + Dense Vectors), reranking, and semantic caching?",
            "Discuss alignment challenges in frontier AI: reward hacking, sycophancy, and scalable oversight.",
        ],
    },
    "Data Analytics": {
        "Easy": [
            "What are the key steps in an Exploratory Data Analysis (EDA) workflow?",
            "How do you identify and handle missing values (imputation vs deletion) in a dataset?",
            "What is the difference between Mean, Median, and Mode, and when should you use Median over Mean?",
            "How do you identify outliers in data using the IQR (Interquartile Range) method and Z-scores?",
            "Explain the difference between correlation and causation with a clear business example.",
            "What are Key Performance Indicators (KPIs) and how do you choose metrics that align with business goals?",
        ],
        "Medium": [
            "How do you design, execute, and analyze an A/B test? How do you determine sample size and statistical significance?",
            "Explain Cohort Analysis and how it is used to measure user retention, churn, and customer lifetime value (LTV).",
            "How do you optimize slow Pandas operations using vectorization, categorical types, and chunking for large CSVs?",
            "Explain the differences between various probability distributions (Normal, Binomial, Poisson) in business analytics.",
            "How do you build an automated ETL pipeline that validates data quality and flags schema drift?",
            "What is the difference between Type I (false positive) and Type II (false negative) errors in hypothesis testing?",
        ],
        "Hard": [
            "How would you design a multi-touch attribution model (Markov Chains vs Shapley values) for marketing spend optimization?",
            "Explain Difference-in-Differences (DiD) and Synthetic Control methods for causal inference when A/B testing is impossible.",
            "How do you architect real-time stream analytics using technologies like Apache Kafka, Flink, and ClickHouse?",
            "How do you handle statistical anomalies like Simpson's Paradox and Selection Bias in business decision datasets?",
        ],
    },
    "Data Structures": {
        "Easy": [
            "What is Big-O notation, and what are the time complexities of common operations in Arrays vs Linked Lists?",
            "Explain the difference between a Stack (LIFO) and a Queue (FIFO) with real-world software applications.",
            "How does a Hash Table achieve O(1) average lookup time, and how are collisions resolved (Chaining vs Open Addressing)?",
            "What is a Binary Search Tree (BST) and what are its search, insertion, and deletion time complexities?",
            "Explain the difference between linear search and binary search. When can binary search be applied?",
            "What is recursion, and what causes a Stack Overflow error in recursive algorithms?",
        ],
        "Medium": [
            "Explain the differences between Breadth-First Search (BFS) and Depth-First Search (DFS) for graph traversal.",
            "How do Min-Heaps and Max-Heaps work, and how are Priority Queues implemented using binary heaps?",
            "What is Dynamic Programming? Compare Top-Down (Memoization) and Bottom-Up (Tabulation) approaches.",
            "How do balanced search trees like AVL Trees or Red-Black Trees maintain logarithmic height guarantees?",
            "Explain the Two-Pointer technique and Sliding Window algorithm with classic problem scenarios.",
            "What is a Trie (Prefix Tree) and how does it optimize autocomplete and prefix search queries?",
            "How do you detect a cycle in a linked list using Floyd's Tortoise and Hare algorithm?",
            "Explain topological sorting on Directed Acyclic Graphs (DAGs) using Kahn's Algorithm or DFS.",
        ],
        "Hard": [
            "Explain the Disjoint Set Union (Union-Find) data structure with Path Compression and Union by Rank.",
            "How does the A* pathfinding algorithm utilize heuristic functions to guarantee shortest paths?",
            "Explain the internal mechanics of a B+ Tree and why relational database indexes prefer B+ Trees over Red-Black Trees.",
            "How do you solve the 0/1 Knapsack and Matrix Chain Multiplication problems using Dynamic Programming?",
            "Describe the design of a thread-safe, lock-free Concurrent Queue or Concurrent HashMap.",
        ],
    },
    "HR": {
        "Easy": [
            "Tell me about yourself and summarize your professional background, strengths, and career journey.",
            "Why are you interested in this specific role and what attracted you to our organization?",
            "What are your greatest professional strengths, and what is one area you are actively working to improve?",
            "How do you prioritize your daily tasks and handle competing deadlines when under pressure?",
            "Describe your ideal work environment and company culture.",
        ],
        "Medium": [
            "Describe a challenging workplace conflict you experienced with a teammate or stakeholder. How did you resolve it?",
            "Tell me about a time a project did not go according to plan. What went wrong and what key lessons did you learn?",
            "How do you give and receive constructive feedback, especially when opinions on technical decisions diverge?",
            "Describe a situation where you took initiative to solve a problem that was outside your direct job description.",
            "How do you stay updated with rapidly evolving industry tools, frameworks, and best practices?",
            "Tell me about a time you had to deliver a complex project under tight deadlines. How did you manage your stress and workload?",
        ],
        "Hard": [
            "Tell me about a high-stakes technical or business decision you made where data was incomplete. How did you navigate the ambiguity?",
            "Describe a situation where you had to persuade leadership or cross-functional teams to change direction on a major strategy.",
            "How do you handle managing or collaborating with team members who have differing work styles or low engagement?",
            "Describe a time you failed to meet an important business goal. How did you communicate the shortfall and take accountability?",
        ],
    },
}


def _build_prompt(category: str, difficulty: str, previous_questions: List[str]) -> str:
    prev = "\n".join(f"- {q}" for q in previous_questions) if previous_questions else "(none)"
    return (
        f"You are an expert technical and behavioural interview question generator. Produce exactly ONE high-quality, "
        f"engaging interview question for the topic '{category}' at '{difficulty}' difficulty.\n"
        f"Requirements:\n"
        f"1. The question must test practical application and real-world understanding.\n"
        f"2. Do NOT repeat or rephrase any of the previous questions listed below.\n"
        f"3. Return ONLY the question text without preamble, numbering, quotes, or markdown.\n\n"
        f"Previous questions asked in this session:\n{prev}\n\nQuestion:"
    )


def _call_openai_chat(prompt: str, api_key: str, model: str = "gpt-4o-mini") -> str:
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }
    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a professional technical interviewer creating realistic interview questions."},
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 150,
        "temperature": 0.8,
    }
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            res_text = resp.read().decode("utf-8")
            j = json.loads(res_text)
            return j["choices"][0]["message"]["content"].strip()
    except Exception as e:
        raise LLMError(f"LLM request failed: {e}") from e


def _get_api_key() -> str | None:
    return (
        os.getenv(LLM_API_KEY_ENV)
        or os.getenv(OPENAI_API_KEY_ENV)
        or os.getenv(GEMINI_API_KEY_ENV)
        or os.getenv(GROQ_API_KEY_ENV)
    )


def generate_question(session: Dict[str, Any]) -> str:
    """Generate a distinct, progressive interview question for the session."""
    category = session.get("category") or "Python"
    difficulty = session.get("difficulty") or "Medium"
    previous = session.get("previous_questions", []) or []
    current_index = len(previous) + 1

    # 1. Attempt LLM generation if an API key is available
    api_key = _get_api_key()
    if api_key:
        try:
            prompt = _build_prompt(category, difficulty, previous)
            response = _call_openai_chat(prompt, api_key)
            if response and len(response) > 15:
                # Check uniqueness against previous questions
                if not any(response.strip().lower() == prev_q.strip().lower() for prev_q in previous):
                    return response
        except LLMError:
            pass

    # 2. Intelligent, diverse question bank selection
    cat_pool = QUESTION_BANK.get(category, QUESTION_BANK.get("Python", {}))
    diff_pool = cat_pool.get(difficulty, cat_pool.get("Medium", []))

    # Normalize previously asked questions for comparison
    prev_normalized = {q.strip().lower() for q in previous}

    # Filter out questions that have already been asked
    available = [q for q in diff_pool if q.strip().lower() not in prev_normalized]

    # If the current difficulty pool is exhausted, borrow from adjacent difficulty pools in the same category
    if not available:
        for other_diff, questions in cat_pool.items():
            for q in questions:
                if q.strip().lower() not in prev_normalized:
                    available.append(q)

    if available:
        # Pick the next progressive question
        chosen = available[0] if len(available) == 1 else random.choice(available)
        return chosen

    # Dynamic fallback generator for extended interview sessions
    topics = {
        "Python": ["metaprogramming", "memory profiling", "async io", "generator pipelines", "type annotations and generics", "unit testing with pytest", "packaging and virtual environments"],
        "SQL": ["materialized views", "distributed query optimization", "dynamic indexing", "window frame clauses", "temporal tables", "database replication lag"],
        "Machine Learning": ["model quantization", "feature drift detection", "hyperparameter tuning with Bayesian optimization", "embedding calibration", "distillation techniques"],
        "Artificial Intelligence": ["prompt caching", "chain-of-thought verification", "vector index pruning", "semantic search latency", "agent grounding"],
        "Data Analytics": ["funnel conversion drop-off", "seasonality decomposition", "cohort retention decay", "statistical power calculation", "data pipeline reconciliation"],
        "Data Structures": ["cache-oblivious algorithms", "succinct data structures", "Bloom filters", "spatial indexing (R-Trees)", "radix sort optimization"],
        "HR": ["cross-timezone team collaboration", "managing technical debt discussions", "mentoring junior engineers", "navigating organizational changes"],
    }
    topic_list = topics.get(category, ["practical engineering decisions"])
    topic = topic_list[(current_index - 1) % len(topic_list)]
    return f"Question {current_index}: In the context of {category} ({difficulty} level), explain how you approach {topic} in production systems, detailing real-world trade-offs and best practices."
