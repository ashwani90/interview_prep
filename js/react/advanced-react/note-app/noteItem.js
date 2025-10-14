import React from "react";

function statusClass(status) {
  if (status === "synced") return "status synced";
  if (status === "syncing") return "status syncing";
  if (status === "pending") return "status pending";
  if (status === "failed") return "status failed";
  return "status";
}

export default function NoteItem({ note, onEdit, onDelete }) {
  const when = note.updatedAt ? new Date(note.updatedAt).toLocaleString() : "";
  return (
    <div className="note-item">
      <div className="note-meta" onClick={() => onEdit(note)}>
        <div className="note-title">{note.title || "Untitled"}</div>
        <div className="note-updated">{when}</div>
      </div>

      <div className="note-actions">
        <div className={statusClass(note.status)} title={`Sync status: ${note.status}`}>
          {note.status}
        </div>
        <button className="small" onClick={() => onEdit(note)}>Edit</button>
        <button className="small danger" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}
