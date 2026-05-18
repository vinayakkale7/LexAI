import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_service import extract_text_from_pdf

router = APIRouter()

# Directory to save uploaded files
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {".pdf"}

# 10 MB limit (placeholder)
MAX_FILE_SIZE = 10 * 1024 * 1024

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a PDF document, save it locally, and extract text preview.
    """
    # 1. Validate file extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")
    
    # 2. Generate unique filename and define save path
    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # 3. Read and save the file
    content = await file.read()
    
    # Validate file size (placeholder for logic)
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 10MB.")

    try:
        with open(file_path, "wb") as f:
            f.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")

    # 4. Extract text using PDF service
    try:
        from fastapi.concurrency import run_in_threadpool
        extracted_text = await run_in_threadpool(extract_text_from_pdf, file_path)
    except Exception as e:
        # We might want to keep the file or delete it, for now we keep it but return an error
        raise HTTPException(status_code=500, detail=str(e))
    
    # 5. Generate a short preview (e.g., first 200 characters)
    preview_length = 200
    preview = extracted_text[:preview_length] + ("..." if len(extracted_text) > preview_length else "")
    
    # Return success response
    return {
        "success": True,
        "filename": file.filename,
        "saved_as": unique_filename,
        "preview": preview,
        "content": extracted_text
    }
