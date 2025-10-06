import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useFileExplorer } from '../../contexts/FileExplorerContext';
import Folder from './Folder';
import './FileExplorer.css';

const FileExplorer = () => {
  const { fileSystem, moveItem } = useFileExplorer();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    moveItem(result.draggableId, result.destination.droppableId);
  };

  return (
    <div className="file-explorer">
      <h2>File Explorer</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="tree-view">
          <Folder item={fileSystem} depth={0} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default FileExplorer;