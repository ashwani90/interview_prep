import React, { useEffect, useState, useCallback } from "react";
import { dbInit, getAllNotes, addNote, updateNote, deleteNote } from "./db";
import { initSyncManager } from "./syncManager";
import NoteList from "./NoteList";
import NoteEditor from "./NoteEditor";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const loadNotes = useCallback(async () => {
    const all = await getAllNotes();
    // sort by updatedAt desc
    all.sort((a, b) => b.updatedAt - a.updatedAt);
    setNotes(all);
  }, []);

  useEffect(() => {
    // init db and load notes
    (async () => {
      await dbInit();
      await loadNotes();
    })();

    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const stopSync = initSyncManager({
      onProgress: loadNotes, // when sync manager changes db, reload UI
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      stopSync();
    };
  }, [loadNotes]);

  const handleCreate = async (title = "Untitled", content = "") => {
    const note = {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8),
      title,
      content,
      updatedAt: Date.now(),
      status: "pending", // pending -> needs to be synced
    };
    await addNote(note);
    await loadNotes();
  };

  const handleSave = async (note) => {
    const updated = {
      ...note,
      updatedAt: Date.now(),
      // after edit we mark pending again
      status: note.status === "synced" ? "pending" : note.status,
    };
    await updateNote(updated);
    setEditingNote(null);
    await loadNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    await loadNotes();
  };

  return (
    <div className="app">
      <header>
        <h1>Offline‑First Notes</h1>
        <div className="status">
          <span className={`dot ${isOnline ? "online" : "offline"}`} />
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>
      </header>

      <main>
        <aside className="sidebar">
          <button onClick={() => handleCreate("New note", "")} className="btn">
            + New Note
          </button>
          <NoteList
            notes={notes}
            onEdit={(n) => setEditingNote(n)}
            onDelete={(id) => handleDelete(id)}
          />
        </aside>

        <section className="editor-area">
          <NoteEditor
            note={editingNote}
            onSave={handleSave}
            onCancel={() => setEditingNote(null)}
          />
        </section>
      </main>

      <footer>
        <small>
          Notes sync statuses: <b>pending</b> = not yet synced, <b>syncing</b> =
          being sent, <b>synced</b> = saved to backend, <b>failed</b> = last
          attempt failed.
        </small>
      </footer>
    </div>
  );
}
