# LexNova — AI Legal Document Intelligence Workspace

LexNova is an AI-powered legal document intelligence platform that enables users to upload, analyze, and interact with legal documents through an intuitive workspace. It combines a modern React frontend with a scalable FastAPI backend to simplify legal document analysis and text extraction.

---

# Features

## Frontend
- Modern SaaS workspace UI
- Dark-mode-first premium design
- Dynamic document rendering
- Responsive workspace layout
- Interactive AI assistant panel

## Backend
- FastAPI backend architecture
- PDF upload API
- Full PDF text extraction
- Swagger API documentation
- Modular and scalable structure

## AI Foundation
- AI-ready document processing pipeline
- Intelligent document analysis architecture

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
LexNova/
│
├── backend/
├── public/
├── src/
├── package.json
└── README.md
```

---

# Current Features

- ✅ PDF upload system
- ✅ Full PDF text extraction
- ✅ Dynamic document rendering
- ✅ Frontend ↔ Backend integration
- ✅ AI legal workspace
- ✅ FastAPI backend architecture

---

# Upcoming Features

- 🚧 AI clause extraction
- 🚧 Legal risk analysis
- 🚧 AI-powered document summaries

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

Frontend runs at:

```text
http://localhost:5173
```

---

# Backend Setup (Windows)

## 1. Navigate to backend

```bash
cd backend
```

## 2. Create virtual environment

```bash
python -m venv venv
```

## 3. Activate virtual environment

```bash
.\venv\Scripts\activate
```

## 4. Install dependencies

```bash
pip install -r requirements.txt
```

## 5. Start FastAPI server

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

# API Documentation

Swagger UI:

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
Upload Legal Document
        ↓
FastAPI Backend
        ↓
PDF Text Extraction
        ↓
Frontend Rendering
        ↓
AI Legal Workspace
```
