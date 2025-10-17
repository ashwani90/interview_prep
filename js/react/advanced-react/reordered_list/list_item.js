import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useList } from '../../../contexts/ListContext';
import './ListItem.css';

const ListItem = ({ item, index }) => {
  const { removeItem, updateItem } = useList();

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`list-item ${snapshot.isDragging ? 'dragging' : ''}`}
        >
          <div className="item-content">
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItem(item.id, { text: e.target.value })}
            />
          </div>
          <button 
            className="remove-btn"
            onClick={() => removeItem(item.id)}
          >
            ×
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;