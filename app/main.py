from fastapi import FastAPI, Depends, Request
from starlette.responses import HTMLResponse
from database_models import Base, Notes
from database import engine, session
from dependencies import get_db
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse
import os

app = FastAPI()

# Create Table
Base.metadata.create_all(bind=engine)

frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
assets_path = os.path.join(frontend_path, "assets")

if os.path.exists(assets_path):
    app.mount("/assets", StaticFiles(directory=assets_path), name="assets")


@app.get("/")
async def serve_frontend():
    index_file = os.path.join(frontend_path, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "Frontend not built yet"}


# GET: Fetch all notes
@app.get("/notes")
def read_notes(db: session = Depends(get_db)):
    return db.query(Notes).all()


# POST: Create a note
@app.post("/notes")
def create_note(data: str, db: session = Depends(get_db)):
    note = Notes(data=data)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note
