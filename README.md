# LexAI — AI Legal Document Intelligence Workspace

LexAI is a modern AI-powered legal document analysis platform that helps users upload, analyze, and interact with legal contracts using intelligent document processing.

The platform combines a premium React workspace UI with a FastAPI backend for PDF upload and text extraction.

---

# Features

## Frontend
- Modern SaaS workspace UI
- Dark-mode-first premium design
- Dynamic document rendering
- Responsive workspace layout
- Floating AI assistant interface

## Backend
- FastAPI backend architecture
- PDF upload API
- Full PDF text extraction
- Swagger API documentation
- Modular scalable structure

## AI Foundation
- Document ingestion pipeline
- AI-ready architecture
- Future support for:
  - clause extraction
  - risk analysis
  - AI summaries
  - RAG chat assistant

---

# Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion
- shadcn/ui

## Backend
- FastAPI
- Uvicorn
- Python 3.11+
- pdfplumber

---

# Project Structure

```text
LexAI/
│
├── backend/
├── public/
├── src/
├── package.json
└── README.md
```

---

# Current Features

✅ PDF upload system  
✅ Full PDF text extraction  
✅ Dynamic document rendering  
✅ Frontend ↔ backend integration  
✅ Workspace-based legal document UI  
✅ FastAPI backend architecture  

---

# Upcoming Features

🚧 AI clause extraction  
🚧 Legal risk analysis  
🚧 AI-generated summaries  
🚧 AI legal assistant  
🚧 RAG-based document chat  

---

# Frontend Setup

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Backend Setup (Windows)

## 1. Navigate to backend folder

```bash
cd backend
```

## 2. Create virtual environment

```bash
python -m venv venv
```

## 3. Activate virtual environment

```bash
.\venv\Scripts\Activate
```

## 4. Install dependencies

```bash
pip install -r requirements.txt
```

## 5. Start FastAPI server

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

# API Documentation

Swagger API Docs:

```text
http://localhost:8000/docs
```

---

# Available API Endpoints

## Health Check

```http
GET /health
```

## Upload PDF

```http
POST /upload
```

---

# Workspace Flow

```text
Upload PDF
      ↓
FastAPI Backend
      ↓
PDF Text Extraction
      ↓
Frontend Rendering
      ↓
AI Legal Workspace
```
