import React, { useState, useEffect } from "react";
import { Plus, FileText, Clock, Trash2 } from "lucide-react";
import { getNotes, addNote } from "./api/notes";

function App() {
  const [noteText, setNoteText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedNotes, setSavedNotes] = useState<any[]>([]);

  // Load notes from backend
  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setSavedNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!noteText.trim()) return;

    setIsLoading(true);
    try {
      await addNote(noteText); // call backend
      setNoteText("");
      fetchNotes(); // reload notes
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    // You don’t have a delete API yet, so this will only delete locally
    setSavedNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quick Notes</h1>
          <p className="text-gray-600">Capture your thoughts instantly</p>
        </div>

        {/* Main Notes Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* Textarea */}
            <div className="mb-6">
              <label htmlFor="note-textarea" className="block text-sm font-medium text-gray-700 mb-3">
                Write your note
              </label>
              <textarea
                id="note-textarea"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Start typing your note here..."
                className="w-full h-40 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 text-base leading-relaxed"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              />
              <div className="mt-2 text-right">
                <span className="text-sm text-gray-400">
                  {noteText.length} characters
                </span>
              </div>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddNote}
                disabled={!noteText.trim() || isLoading}
                className="inline-flex items-center px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Note
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {/* Saved Notes Section */}
        {savedNotes.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Notes</h2>
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                {savedNotes.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {savedNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatTimestamp(note.created_at)}
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {note.data}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {savedNotes.length === 0 && (
          <div className="mt-8 text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No notes yet</h3>
            <p className="text-gray-500">Your saved notes will appear here</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Ready to capture your ideas
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;