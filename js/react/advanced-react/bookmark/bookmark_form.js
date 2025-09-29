import React, { useState } from 'react';
import { useBookmarks } from '../contexts/BookmarkContext';
import { v4 as uuidv4 } from 'uuid';
import './BookmarkForm.css';

const BookmarkForm = ({ bookmarkToEdit, onCancel }) => {
  const { addBookmark, updateBookmark, folders, tags } = useBookmarks();
  const [formData, setFormData] = useState({
    id: bookmarkToEdit?.id || uuidv4(),
    title: bookmarkToEdit?.title || '',
    url: bookmarkToEdit?.url || '',
    folder: bookmarkToEdit?.folder || '',
    tags: bookmarkToEdit?.tags || [],
    notes: bookmarkToEdit?.notes || ''
  });
  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bookmarkToEdit) {
        await updateBookmark(formData);
      } else {
        await addBookmark(formData);
      }
      onCancel();
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bookmark-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      
      <div className="form-group">
        <label>URL</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Folder</label>
        <input
          type="text"
          value={formData.folder}
          onChange={(e) => setFormData({...formData, folder: e.target.value})}
          list="folders"
        />
        <datalist id="folders">
          {folders.map(folder => (
            <option key={folder} value={folder} />
          ))}
        </datalist>
      </div>
      
      <div className="form-group">
        <label>Tags</label>
        <div className="tags-input">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            placeholder="Add tag..."
          />
          <button type="button" onClick={handleAddTag}>Add</button>
        </div>
        <div className="tags-list">
          {formData.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
            </span>
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label>Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">{bookmarkToEdit ? 'Update' : 'Add'} Bookmark</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default BookmarkForm;