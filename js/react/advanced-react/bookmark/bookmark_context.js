import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/db';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [isDBReady, setIsDBReady] = useState(false);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await db.open();
        setIsDBReady(true);
        const allBookmarks = await db.getAllBookmarks();
        setBookmarks(allBookmarks);
        updateFoldersAndTags(allBookmarks);
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };

    initializeDB();
  }, []);

  const updateFoldersAndTags = (bookmarks) => {
    const folderSet = new Set();
    const tagSet = new Set();

    bookmarks.forEach(bookmark => {
      if (bookmark.folder) folderSet.add(bookmark.folder);
      if (bookmark.tags) {
        bookmark.tags.forEach(tag => tagSet.add(tag));
      }
    });

    setFolders(Array.from(folderSet).sort());
    setTags(Array.from(tagSet).sort());
  };

  const addBookmark = async (bookmark) => {
    try {
      await db.addBookmark(bookmark);
      const updatedBookmarks = [...bookmarks, bookmark];
      setBookmarks(updatedBookmarks);
      updateFoldersAndTags(updatedBookmarks);
    } catch (error) {
      console.error('Failed to add bookmark:', error);
      throw error;
    }
  };

  const updateBookmark = async (bookmark) => {
    try {
      await db.updateBookmark(bookmark);
      const updatedBookmarks = bookmarks.map(b => 
        b.id === bookmark.id ? bookmark : b
      );
      setBookmarks(updatedBookmarks);
      updateFoldersAndTags(updatedBookmarks);
    } catch (error) {
      console.error('Failed to update bookmark:', error);
      throw error;
    }
  };

  const deleteBookmark = async (id) => {
    try {
      await db.deleteBookmark(id);
      const updatedBookmarks = bookmarks.filter(b => b.id !== id);
      setBookmarks(updatedBookmarks);
      updateFoldersAndTags(updatedBookmarks);
    } catch (error) {
      console.error('Failed to delete bookmark:', error);
      throw error;
    }
  };

  const getBookmarksByTag = async (tag) => {
    try {
      return await db.getBookmarksByTag(tag);
    } catch (error) {
      console.error('Failed to get bookmarks by tag:', error);
      throw error;
    }
  };

  const getBookmarksByFolder = async (folder) => {
    try {
      return await db.getBookmarksByFolder(folder);
    } catch (error) {
      console.error('Failed to get bookmarks by folder:', error);
      throw error;
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        folders,
        tags,
        isDBReady,
        addBookmark,
        updateBookmark,
        deleteBookmark,
        getBookmarksByTag,
        getBookmarksByFolder
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);