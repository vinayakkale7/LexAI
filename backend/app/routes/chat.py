from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import os
import google.generativeai as genai
import logging
from fastapi.concurrency import run_in_threadpool

logger = logging.getLogger(__name__)

router = APIRouter()

class ChatRequest(BaseModel):
    document_content: str
    messages: List[Dict[str, str]]

def generate_chat_response(document_content: str, messages: List[Dict[str, str]]) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_key":
        return "This is a mock response. Please configure GEMINI_API_KEY to enable AI chat."

    try:
        genai.configure(api_key=api_key)
        
        # We use a system instruction that contains the document
        system_prompt = f"""
You are an expert AI legal assistant embedded in the LexAI workspace.
You are helping the user understand the following document.
Base your answers ONLY on the provided document context. If the document does not contain the answer, state that clearly.

--- DOCUMENT CONTEXT ---
{document_content[:80000]} # Truncate to prevent token overflow
--- END OF DOCUMENT ---
"""
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_prompt)
        
        # Convert messages to Gemini format (Gemini uses "user" and "model")
        # Ensure alternating user/model pattern
        gemini_messages = []
        for msg in messages:
            role = "model" if msg["role"] == "assistant" else "user"
            gemini_messages.append({"role": role, "parts": [msg["content"]]})

        response = model.generate_content(gemini_messages)
        return response.text
    except Exception as e:
        logger.error(f"Chat failed: {e}")
        raise Exception(f"Chat failed: {e}")

@router.post("/chat")
async def chat_with_document(request: ChatRequest):
    """
    Chat with the AI about the uploaded document.
    """
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages are required.")
        
    try:
        response_text = await run_in_threadpool(
            generate_chat_response, 
            request.document_content, 
            request.messages
        )
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
