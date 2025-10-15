// syncManager.js
import { getAllNotes, updateNote } from "./db";
import { syncNoteToServer } from "./api";

/*
initSyncManager({ onProgress }) => returns stop() function

Behavior:
- Immediately attempts to sync notes with status 'pending' or 'failed' when online.
- Listens for 'online' events to attempt immediate sync.
- Periodically retries every RETRY_INTERVAL_MS.
- Calls onProgress() after any status change so UI can reload notes.
*/

const RETRY_INTERVAL_MS = 10_000; // 10 seconds retry

export function initSyncManager({ onProgress = () => {} } = {}) {
  let interval = null;
  let stopped = false;

  async function attemptSyncAll() {
    if (!navigator.onLine) return;
    try {
      const all = await getAllNotes();
      const toSync = all.filter((n) => n.status === "pending" || n.status === "failed");
      for (const note of toSync) {
        if (stopped) return;
        // mark as syncing
        await updateNote({ ...note, status: "syncing" });
        onProgress();

        try {
          const res = await syncNoteToServer(note);
          // mark as synced
          const updated = {
            ...note,
            status: "synced",
            syncedAt: res.syncedAt,
            updatedAt: Date.now(),
          };
          await updateNote(updated);
          onProgress();
        } catch (err) {
          // mark as failed
          const updated = {
            ...note,
            status: "failed",
            lastError: err && err.message ? err.message : String(err),
            updatedAt: Date.now(),
          };
          await updateNote(updated);
          onProgress();
        }
      }
    } catch (e) {
      console.error("Sync manager error", e);
    }
  }

  function start() {
    // immediate
    attemptSyncAll();
    // periodic retries
    interval = setInterval(attemptSyncAll, RETRY_INTERVAL_MS);

    // when browser regains connectivity
    window.addEventListener("online", attemptSyncAll);
  }

  function stop() {
    stopped = true;
    if (interval) clearInterval(interval);
    window.removeEventListener("online", attemptSyncAll);
  }

  start();

  return stop;
}
