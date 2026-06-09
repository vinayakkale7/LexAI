import os
import json
import logging
import google.generativeai as genai

from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

print("API KEY FOUND:", bool(GEMINI_API_KEY))

logger = logging.getLogger(__name__)

# System prompt for structured extraction
SYSTEM_PROMPT = """
You are an expert AI legal assistant.
Analyze the following legal document and extract key clauses, metadata, financial terms, and risk indicators.
Focus on: agreement duration, payment terms, deposits, cancellation clauses, obligations, penalties, restrictions, and notice periods.

You MUST return your response as a valid JSON object strictly adhering to this schema:
{
  "summary": {
    "type": "e.g., Rental Agreement, NDA, Employment Contract",
    "parties": "Briefly list parties involved",
    "duration": "e.g., 11 Months, Perpetual, 2 Years",
    "rent": "e.g., ₹20,000/month or N/A",
    "deposit": "e.g., ₹50,000 or N/A",
    "overall_risk": "Low, Medium, or High"
  },
  "clauses": [
    {
      "title": "Clause Title (e.g., Payment Terms, Termination Clause)",
      "risk": "Low" | "Medium" | "High",
      "content": "A concise summary or explanation of the clause and why it carries that risk.",
      "exact_quote": "A verbatim exact string excerpt from the document text that represents this clause. Keep it under 200 characters if possible, but it MUST be exactly as it appears in the text so it can be highlighted.",
      "type": "e.g., Payment, Cancellation, Penalty, Termination, Liability, Confidentiality, Obligation, Restriction"
    }
  ],
  "risks": {
    "high": <integer count of high risk clauses>,
    "medium": <integer count of medium risk clauses>,
    "low": <integer count of low risk clauses>
  },
  "key_insights": [
    "A crucial insight, obligation, or deadline (e.g., 'Monthly rent must be paid within first five days.')",
    "Another important insight."
  ]
}
Do not include markdown blocks like ```json ... ```, just output the raw JSON object.
"""

def analyze_document_text(text: str) -> dict:
    """
    Analyzes document text using Gemini.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    print("Gemini Key Loaded:", bool(api_key))
    if not api_key or api_key == "your_key":
        raise ValueError("No valid GEMINI_API_KEY found.")
        
    try:
        print("Starting Gemini Analysis...")
        print("Text Length:", len(text))
        genai.configure(api_key=api_key)
        # Using Gemini 2.5 Flash as 1.5 is deprecated
        model = genai.GenerativeModel('gemini-2.5-flash', system_instruction=SYSTEM_PROMPT)
        
        # Limit text size to prevent massive payload issues if needed
        max_chars = 100000
        truncated_text = text[:max_chars]
        
        response = model.generate_content(
            truncated_text,
            generation_config=genai.types.GenerationConfig(
                temperature=0.1,
                response_mime_type="application/json"
            )
        )
        
        print("Gemini Response Received")
        print(response.text[:1000])
        
        return json.loads(response.text)
    except Exception as e:
        import traceback
        print("===== AI ANALYSIS ERROR =====")
        traceback.print_exc()
        print("============================")
        raise e

