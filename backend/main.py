from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import json

app = FastAPI(title="Roadmap Progress API")

# Allow the Vite dev server (and Docker frontend) to call us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# progress.json lives in the project root (one level above backend/)
PROGRESS_FILE = Path(__file__).resolve().parent.parent / "progress.json"


def _read() -> dict:
    """Load progress.json, creating it with an empty dict if missing."""
    if not PROGRESS_FILE.exists():
        _write({})
    return json.loads(PROGRESS_FILE.read_text())


def _write(data: dict):
    """Persist progress data to disk."""
    PROGRESS_FILE.write_text(json.dumps(data, indent=2))


class ToggleRequest(BaseModel):
    topic_id: str
    completed: bool


@app.get("/progress")
def get_progress():
    """Return the full progress dictionary."""
    return _read()


@app.post("/progress")
def update_progress(req: ToggleRequest):
    """Toggle a single topic's completion status."""
    data = _read()
    data[req.topic_id] = req.completed
    _write(data)
    return {"status": "ok", "topic_id": req.topic_id, "completed": req.completed}
