from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health, upload

# Initialize FastAPI app
app = FastAPI(
    title="LexAI Backend",
    description="Backend API for LexAI document intelligence workspace",
    version="1.0.0"
)

# Configure CORS for React frontend (Vite defaults to port 5173)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(upload.router, tags=["Uploads"])

@app.get("/")
async def root():
    return {"message": "Welcome to LexAI Backend API. Visit /docs for documentation."}
