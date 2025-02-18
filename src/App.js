import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch Notes from API
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const createNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/note`, { title, content });
      const newNote = { noteId: response.data.noteId, title, content };

      setNotes(prevNotes => [newNote, ...prevNotes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/note/${id}`);
      setNotes(prevNotes => prevNotes.filter(note => note.noteId !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="app-container">
      <h2>Serverless Notes App</h2>

      {/* Create Note Section */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={createNote} className="create-btn">Create Note</button>
      </div>

      {/* Notes Display Section */}
      <h3>Notes</h3>
      <div className="notes-container">
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note) => (
            <div key={note.noteId} className="note-card">
              <h4>{note.title}</h4>
              <p>{note.content}</p>
              <button onClick={() => deleteNote(note.noteId)} className="delete-btn">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
