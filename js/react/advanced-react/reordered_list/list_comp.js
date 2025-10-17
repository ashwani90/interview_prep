import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useList } from '../../contexts/ListContext';
import ListItem from './ListItem';
import AddItemForm from './AddItemForm';
import './List.css';

const List = () => {
  const { items, reorderItems, isLoading } = useList();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    reorderItems(result.source.index, result.destination.index);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list-container">
      <h2>Reorderable List</h2>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="list">
          {items.map((item, index) => (
            <ListItem 
              key={item.id} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </DragDropContext>

      <AddItemForm />
    </div>
  );
};

export default List;