import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

export default function Column({ column }) {
  return (
    <div className="column">
      <h3 className="column-title">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`column-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {column.items.map((item, index) => (
              <Card key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
