import React, { createContext, useContext, useState, useEffect } from 'react';

const FileExplorerContext = createContext();

export const FileExplorerProvider = ({ children }) => {
  const [fileSystem, setFileSystem] = useState(() => {
    // Initial file system structure
    return {
      id: 'root',
      name: 'Root',
      type: 'folder',
      children: [
        {
          id: 'folder1',
          name: 'Documents',
          type: 'folder',
          children: [
            { id: 'file1', name: 'Resume.pdf', type: 'file' },
            { id: 'file2', name: 'CoverLetter.docx', type: 'file' }
          ]
        },
        {
          id: 'folder2',
          name: 'Pictures',
          type: 'folder',
          children: [
            { id: 'file3', name: 'Vacation.jpg', type: 'file' },
            { id: 'file4', name: 'Profile.png', type: 'file' }
          ]
        },
        { id: 'file5', name: 'README.txt', type: 'file' }
      ]
    };
  });

  const [expandedFolders, setExpandedFolders] = useState(['root']);

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId) 
        : [...prev, folderId]
    );
  };

  const moveItem = (sourceId, targetId) => {
    if (sourceId === targetId) return;

    setFileSystem(prev => {
      const newFileSystem = JSON.parse(JSON.stringify(prev));
      const { item: movedItem, parent: sourceParent } = findItemAndParent(newFileSystem, sourceId);
      const { parent: targetParent } = findItemAndParent(newFileSystem, targetId);

      // Remove from source
      sourceParent.children = sourceParent.children.filter(child => child.id !== sourceId);
      
      // Add to target (if target is a folder)
      if (targetParent.type === 'folder') {
        if (!targetParent.children) targetParent.children = [];
        targetParent.children.push(movedItem);
      }

      return newFileSystem;
    });
  };

  const findItemAndParent = (currentNode, itemId, parent = null) => {
    if (currentNode.id === itemId) return { item: currentNode, parent };
    
    if (currentNode.children) {
      for (const child of currentNode.children) {
        const found = findItemAndParent(child, itemId, currentNode);
        if (found) return found;
      }
    }
    
    return null;
  };

  return (
    <FileExplorerContext.Provider
      value={{
        fileSystem,
        expandedFolders,
        toggleFolder,
        moveItem
      }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
};

export const useFileExplorer = () => useContext(FileExplorerContext);