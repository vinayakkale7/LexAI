# LexAI — AI-Powered Legal Document Intelligence

LexAI is a modern AI-powered legal document analysis platform that enables users to upload contracts, agreements, and legal documents, extract structured information, identify risks, and generate AI-driven insights using Google's Gemini AI.

## Features

### Legal Document Analysis

* Upload PDF legal documents
* Extract full document text
* Process contracts and agreements
* View document content in a modern workspace

### AI-Powered Intelligence

* Gemini AI integration
* Agreement type detection
* Key clause extraction
* Risk assessment (Low / Medium / High)
* Contract duration detection
* Financial term extraction
* Key insights generation

### Modern Workspace

* Notion-inspired workspace interface
* Split-pane document reader
* AI insights dashboard
* Real-time analysis results
* Responsive design
* Dark mode UI

### Backend

* FastAPI REST API
* PDF processing using pdfplumber
* Gemini AI document analysis
* CORS-enabled frontend integration
* Structured JSON responses

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* shadcn/ui
* Framer Motion
* React Router

### Backend

* FastAPI
* Python
* pdfplumber
* Google Gemini API
* python-dotenv
* Uvicorn

---

## Project Structure

```text
LexAI/
│
├── src/                     # React Frontend
├── public/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── package.json
└── README.md
```

---

## Setup (Windows)

### Clone Repository

```bash
git clone https://github.com/vinayakkale7/LexAI.git
cd LexAI
```

---

## Frontend Setup

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

---

## Environment Variables

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

⚠️ Never commit your .env file to GitHub.

---

## Current Status

### Completed

* Modern SaaS workspace UI
* PDF upload system
* FastAPI backend
* Full text extraction
* Gemini AI integration
* Contract summarization
* Risk analysis
* Key insights generation
* Dynamic document dashboard

### Planned Features

* Clause highlighting
* AI document chat
* Exportable PDF reports
* RAG-based legal assistant
* Multi-document management
* User authentication
* Legal playbook compliance checks


## Screenshots

<img width="1919" height="865" alt="image" src="https://github.com/user-attachments/assets/98a6d2ea-dfcc-4c03-b02d-3355d8960246" />




