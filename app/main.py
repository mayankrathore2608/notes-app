from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from database_models import Base, Notes
from database import engine, session
from dependencies import get_db


app = FastAPI()

# Create Table
Base.metadata.create_all(bind=engine)

origins = [
    "https://notes-app-2-w6nz.onrender.com",  # frontend domain
    "http://localhost:8000",  # for local testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "FastAPI backend is running"}


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
