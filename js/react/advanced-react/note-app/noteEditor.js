import React, { useEffect, useState } from "react";

// Controlled editor for creating/editing a note.
// When note prop is null -> show placeholder and allow creating a new note via parent "New Note" button.
// When a note is provided, it loads to the editor.

export default function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
  }, [note]);

  if (!note) {
    return (
      <div className="editor placeholder">
        <h2>Select a note or create one</h2>
        <p>Click <b>+ New Note</b> to start. Then click a note in the list to edit and sync.</p>
      </div>
    );
  }

  const handleSave = () => {
    const updated = {
      ...note,
      title,
      content,
    };
    onSave(updated);
  };

  return (
    <div className="editor">
      <input
        className="title-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="content-input"
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="editor-actions">
        <button className="btn" onClick={handleSave}>Save</button>
        <button className="btn secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
