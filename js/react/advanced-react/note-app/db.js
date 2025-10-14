// db.js
const DB_NAME = "offline_notes_db";
const DB_VERSION = 1;
const STORE = "notes";

let dbPromise = null;

export function dbInit() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (ev) => {
      const db = ev.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function withStore(mode, callback) {
  const db = await dbInit();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const store = tx.objectStore(STORE);
    let result;
    try {
      result = callback(store);
    } catch (err) {
      reject(err);
    }
    tx.oncomplete = () => resolve(result);
    tx.onabort = tx.onerror = () => reject(tx.error);
  });
}

export async function addNote(note) {
  return withStore("readwrite", (store) => {
    store.add(note);
    return note;
  });
}

export async function updateNote(note) {
  return withStore("readwrite", (store) => {
    store.put(note);
    return note;
  });
}

export async function deleteNote(id) {
  return withStore("readwrite", (store) => {
    store.delete(id);
  });
}

export async function getNote(id) {
  const db = await dbInit();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllNotes() {
  const db = await dbInit();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
