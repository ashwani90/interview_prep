import React, { createContext, useContext, useState, useEffect } from 'react';

const ListContext = createContext();

export const ListProvider = ({ children, storageKey = 'reorderable-list' }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem(storageKey);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
    setIsLoading(false);
  }, [storageKey]);

  // Save to localStorage when items change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, storageKey, isLoading]);

  const reorderItems = (startIndex, endIndex) => {
    const result = Array.from(items);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setItems(result);
  };

  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id, updates) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  return (
    <ListContext.Provider
      value={{
        items,
        isLoading,
        reorderItems,
        addItem,
        removeItem,
        updateItem
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => useContext(ListContext);