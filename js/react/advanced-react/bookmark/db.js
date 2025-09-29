export class DB {
    constructor(name = 'BookmarkDB', version = 1) {
      this.name = name;
      this.version = version;
      this.db = null;
    }
  
    async open() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.name, this.version);
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('bookmarks')) {
            const store = db.createObjectStore('bookmarks', { keyPath: 'id' });
            store.createIndex('tags', 'tags', { multiEntry: true });
            store.createIndex('folder', 'folder');
          }
        };
  
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };
  
        request.onerror = (event) => {
          reject(event.target.error);
        };
      });
    }
  
    async addBookmark(bookmark) {
      const tx = this.db.transaction('bookmarks', 'readwrite');
      const store = tx.objectStore('bookmarks');
      return new Promise((resolve, reject) => {
        const request = store.add(bookmark);
        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
      });
    }
  
    async updateBookmark(bookmark) {
      const tx = this.db.transaction('bookmarks', 'readwrite');
      const store = tx.objectStore('bookmarks');
      return new Promise((resolve, reject) => {
        const request = store.put(bookmark);
        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
      });
    }
  
    async deleteBookmark(id) {
      const tx = this.db.transaction('bookmarks', 'readwrite');
      const store = tx.objectStore('bookmarks');
      return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
      });
    }
  
    async getAllBookmarks() {
      const tx = this.db.transaction('bookmarks', 'readonly');
      const store = tx.objectStore('bookmarks');
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
      });
    }
  
    async getBookmarksByTag(tag) {
      const tx = this.db.transaction('bookmarks', 'readonly');
      const store = tx.objectStore('bookmarks');
      const index = store.index('tags');
      return new Promise((resolve, reject) => {
        const request = index.getAll(tag);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
      });
    }
  
    async getBookmarksByFolder(folder) {
      const tx = this.db.transaction('bookmarks', 'readonly');
      const store = tx.objectStore('bookmarks');
      const index = store.index('folder');
      return new Promise((resolve, reject) => {
        const request = index.getAll(folder);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
      });
    }
  }
  
  export const db = new DB();