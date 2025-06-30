from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi import HTTPException
import os
import json
import uuid

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SAVE_DIR = "saved_resumes"
os.makedirs(SAVE_DIR, exist_ok=True)

class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class SaveResumeRequest(BaseModel):
    resume: dict

@app.get("/")
def root():
    return {"message" : "server is running"}

@app.post("/ai-enhance")
async def ai_enhance(req: AIEnhanceRequest):
    enhanced_content = f"✨ Enhanced Version of {req.section} ✨: {req.content} (Improved)"
    return {"enhanced_content": enhanced_content}

@app.post("/save-resume")
async def save_resume(req: SaveResumeRequest):
    resume_id = str(uuid.uuid4())
    file_path = os.path.join(SAVE_DIR, f"{resume_id}.json")
    with open(file_path, "w") as f:
        json.dump(req.resume, f, indent=2)
    return {"message": "Resume saved successfully", "resume_id": resume_id}

@app.get("/download-resume/{resume_id}")
def download_resume(resume_id: str):
    file_path = os.path.join(SAVE_DIR, f"{resume_id}.json")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Resume not found")
    return FileResponse(file_path, media_type='application/json', filename=f"{resume_id}.json")

