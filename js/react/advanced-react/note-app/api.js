// api.js - mock backend API
// We'll simulate a backend that accepts notes and returns the saved note with a server timestamp.
// In a real app you'd replace these with fetch() calls to your real backend.

export async function syncNoteToServer(note) {
    // simulate network latency
    const latency = 300 + Math.random() * 800;
    await new Promise((r) => setTimeout(r, latency));
  
    // Simulate online/offline error (should not be used to detect navigator.onLine; just simulation)
    // We'll simulate a 80% success rate
    const success = Math.random() < 0.8;
  
    if (!success) {
      const err = new Error("Mock sync failed");
      err.code = "MOCK_FAIL";
      throw err;
    }
  
    // server "accepts" the note and returns a syncedAt timestamp
    return {
      ...note,
      syncedAt: Date.now(),
    };
  }
  
  /*
  If you want to test deterministic failures for certain notes, you could add a property to the note
  (e.g. note.forceFail = true) and have syncNoteToServer throw if that exists.
  */
  