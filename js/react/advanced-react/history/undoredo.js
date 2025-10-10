import { useState, useEffect, useCallback } from 'react';
import { historyService } from '../services/historyService';

export const useUndoRedo = (initialState) => {
  const [state, setState] = useState(initialState);

  const executeAction = useCallback((action) => {
    setState(prevState => {
      const newState = action.execute(prevState);
      historyService.push(action);
      return newState;
    });
  }, []);

  const undo = useCallback(() => {
    setState(prevState => historyService.undo(prevState));
  }, []);

  const redo = useCallback(() => {
    setState(prevState => historyService.redo(prevState));
  }, []);

  const canUndo = historyService.canUndo();
  const canRedo = historyService.canRedo();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && canUndo) {
          e.preventDefault();
          undo();
        } else if (e.key === 'y' && canRedo) {
          e.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo]);

  return {
    state,
    setState,
    executeAction,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};