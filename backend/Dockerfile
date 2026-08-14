FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Expose default port
EXPOSE 8000

# Start command using environment PORT if set
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port "]
