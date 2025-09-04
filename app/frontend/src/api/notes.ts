// src/api/notes.ts

// Fetch all notes from FastAPI
export const getNotes = async () => {
  const response = await fetch("/notes");
  if (!response.ok) throw new Error("Failed to fetch notes");
  return await response.json();
};

// Add a new note (your backend uses query param style: /notes?data=)
export const addNote = async (note: string) => {
  const response = await fetch(`/notes?data=${encodeURIComponent(note)}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to add note");
  return await response.json();
};
