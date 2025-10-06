import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './File.css';

const File = ({ item, index, depth }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="file"
          style={{ paddingLeft: `${depth * 15}px` }}
        >
          📄 {item.name}
        </div>
      )}
    </Draggable>
  );
};

export default File;