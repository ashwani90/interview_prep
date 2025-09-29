import React, { useState } from 'react';
import { useBookmarks } from '../contexts/BookmarkContext';
import BookmarkForm from './BookmarkForm';
import './BookmarkList.css';

const BookmarkList = () => {
  const { bookmarks, deleteBookmark, folders, tags } = useBookmarks();
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [activeFolder, setActiveFolder] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesFolder = activeFolder === 'All' || bookmark.folder === activeFolder;
    const matchesTag = activeTag === 'All' || (bookmark.tags && bookmark.tags.includes(activeTag));
    const matchesSearch = searchQuery === '' || 
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bookmark.notes && bookmark.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFolder && matchesTag && matchesSearch;
  });

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      await deleteBookmark(id);
    }
  };

  return (
    <div className="bookmark-list">
      <div className="controls">
        <div className="filter-controls">
          <select 
            value={activeFolder} 
            onChange={(e) => setActiveFolder(e.target.value)}
          >
            <option value="All">All Folders</option>
            {folders.map(folder => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
          </select>
          
          <select 
            value={activeTag} 
            onChange={(e) => setActiveTag(e.target.value)}
          >
            <option value="All">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
        
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <button 
          className="add-button"
          onClick={() => setEditingBookmark({})}
        >
          Add Bookmark
        </button>
      </div>
      
      {editingBookmark && (
        <div className="modal">
          <div className="modal-content">
            <BookmarkForm 
              bookmarkToEdit={editingBookmark.id ? editingBookmark : null}
              onCancel={() => setEditingBookmark(null)}
            />
          </div>
        </div>
      )}
      
      <div className="bookmarks-grid">
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map(bookmark => (
            <div key={bookmark.id} className="bookmark-card">
              <div className="bookmark-header">
                <h3>
                  <a 
                    href={bookmark.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {bookmark.title}
                  </a>
                </h3>
                <div className="bookmark-actions">
                  <button onClick={() => handleEdit(bookmark)}>Edit</button>
                  <button onClick={() => handleDelete(bookmark.id)}>Delete</button>
                </div>
              </div>
              
              <p className="bookmark-url">{bookmark.url}</p>
              
              {bookmark.folder && (
                <span className="bookmark-folder">{bookmark.folder}</span>
              )}
              
              {bookmark.tags && bookmark.tags.length > 0 && (
                <div className="bookmark-tags">
                  {bookmark.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="tag"
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {bookmark.notes && (
                <p className="bookmark-notes">{bookmark.notes}</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-bookmarks">No bookmarks found</p>
        )}
      </div>
    </div>
  );
};

export default BookmarkList;