const API_BASE = "https://notes-app-4q23.onrender.com";

export const getNotes = async () => {
  const response = await fetch(`${API_BASE}/notes`);
  if (!response.ok) throw new Error("Failed to fetch notes");
  return await response.json();
};

export const addNote = async (note: string) => {
  const response = await fetch(`${API_BASE}/notes?data=${encodeURIComponent(note)}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to add note");
  return await response.json();
};
