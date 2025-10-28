import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

// helper to reorder items within same list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// helper to move item between lists
const move = (source, destination, sourceIndex, destIndex) => {
  const src = Array.from(source);
  const dest = Array.from(destination);
  const [moved] = src.splice(sourceIndex, 1);
  dest.splice(destIndex, 0, moved);
  return { source: src, destination: dest };
};

const initialData = {
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      items: [
        { id: 'task-1', content: 'Design homepage wireframe' },
        { id: 'task-2', content: 'Create product backlog' },
        { id: 'task-3', content: 'Write onboarding copy' },
      ],
    },
    inprogress: {
      id: 'inprogress',
      title: 'In Progress',
      items: [
        { id: 'task-4', content: 'Implement auth flow' },
      ],
    },
    done: {
      id: 'done',
      title: 'Done',
      items: [
        { id: 'task-5', content: 'Set up project repository' },
      ],
    },
  },
  // order of columns
  columnOrder: ['todo', 'inprogress', 'done'],
};

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside any droppable
    if (!destination) return;

    // same column reordering
    if (source.droppableId === destination.droppableId) {
      const column = data.columns[source.droppableId];
      const newItems = reorder(column.items, source.index, destination.index);
      const newColumn = { ...column, items: newItems };
      const newData = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      };
      setData(newData);
      return;
    }

    // moving between columns
    const sourceCol = data.columns[source.droppableId];
    const destCol = data.columns[destination.droppableId];
    const movedResult = move(sourceCol.items, destCol.items, source.index, destination.index);

    const newSourceCol = { ...sourceCol, items: movedResult.source };
    const newDestCol = { ...destCol, items: movedResult.destination };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newSourceCol.id]: newSourceCol,
        [newDestCol.id]: newDestCol,
      },
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {data.columnOrder.map((colId) => {
          const column = data.columns[colId];
          return (
            <Column key={column.id} column={column} />
          );
        })}
      </div>
    </DragDropContext>
  );
}
