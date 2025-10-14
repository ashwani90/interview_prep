import React from "react";
import NoteItem from "./NoteItem";

export default function NoteList({ notes = [], onEdit, onDelete }) {
  return (
    <div className="note-list">
      {notes.length === 0 && <div className="empty">No notes yet</div>}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
