import React, { useState } from 'react';
import { useList } from '../../../contexts/ListContext';
import './AddItemForm.css';

const AddItemForm = () => {
  const [newItemText, setNewItemText] = useState('');
  const { addItem } = useList();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    
    addItem({
      id: Date.now().toString(),
      text: newItemText
    });
    setNewItemText('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
        placeholder="Add new item..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItemForm;