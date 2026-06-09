import asyncio
import os
import sys

# Add backend directory to sys.path so we can import app modules
sys.path.append(os.path.join(os.path.dirname(__file__), "backend"))

from app.services.ai_analysis_service import analyze_document_text

async def main():
    text = "LEAVE AND LICENSE AGREEMENT This agreement is made..."
    print("Testing analyze_document_text...")
    try:
        result = analyze_document_text(text)
        print("Success:", result)
    except Exception as e:
        print("Failed!")
        raise e

if __name__ == "__main__":
    asyncio.run(main())
