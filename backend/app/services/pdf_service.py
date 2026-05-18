import pdfplumber
import logging

logger = logging.getLogger(__name__)

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file using pdfplumber.
    
    Args:
        file_path (str): The absolute path to the PDF file.
        
    Returns:
        str: The extracted text from the PDF.
        
    Raises:
        Exception: If extraction fails or the file cannot be read.
    """
    text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for i, page in enumerate(pdf.pages):
                # Extract text (avoid layout=True as it causes hangs on some complex PDFs)
                page_text = page.extract_text()
                if page_text:
                    if i > 0:
                        text += f"\n\n{'-' * 40}\nPage {i + 1}\n{'-' * 40}\n\n"
                    text += page_text.strip() + "\n"
        return text.strip()
    except Exception as e:
        logger.error(f"Failed to extract text from {file_path}: {e}")
        raise Exception(f"Failed to process PDF: {str(e)}")
