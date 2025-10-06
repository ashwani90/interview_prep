import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useFileExplorer } from '../../../contexts/FileExplorerContext';
import File from './File';
import './Folder.css';

const Folder = ({ item, depth }) => {
  const { expandedFolders, toggleFolder } = useFileExplorer();
  const isExpanded = expandedFolders.includes(item.id);

  return (
    <Droppable droppableId={item.id} type="FOLDER">
      {(provided) => (
        <div 
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="folder-container"
        >
          <Draggable draggableId={item.id} index={0}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                className="folder"
                style={{ paddingLeft: `${depth * 15}px` }}
              >
                <span 
                  className="folder-name"
                  onClick={() => toggleFolder(item.id)}
                  {...provided.dragHandleProps}
                >
                  {isExpanded ? '📂' : '📁'} {item.name}
                </span>
              </div>
            )}
          </Draggable>

          {isExpanded && item.children && (
            <div className="folder-contents">
              {item.children.map((child, index) => (
                child.type === 'folder' ? (
                  <Folder 
                    key={child.id} 
                    item={child} 
                    depth={depth + 1} 
                  />
                ) : (
                  <File 
                    key={child.id} 
                    item={child} 
                    index={index} 
                    depth={depth + 1} 
                  />
                )
              ))}
              {provided.placeholder}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default Folder;