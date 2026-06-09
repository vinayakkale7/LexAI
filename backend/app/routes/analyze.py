from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.concurrency import run_in_threadpool
from app.services.ai_analysis_service import analyze_document_text

router = APIRouter()

class AnalyzeRequest(BaseModel):
    content: str

@router.post("/analyze")
async def analyze_document(request: AnalyzeRequest):
    """
    Analyze document text using AI to extract clauses and risks.
    """
    if not request.content or len(request.content.strip()) == 0:
        raise HTTPException(status_code=400, detail="Document content is required.")
        
    try:
        print("Analysis Request Received")
        # Run AI analysis in threadpool to avoid blocking event loop
        analysis_result = await run_in_threadpool(analyze_document_text, request.content)
        print("Analysis completed and sent to frontend")
        return analysis_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
