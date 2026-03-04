import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { undo, redo } from '../store/actions/undoActions';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';

const UndoRedoControls = () => {
  useKeyboardShortcuts();
  
  const dispatch = useDispatch();
  const canUndo = useSelector(state => 
    Object.values(state).some(reducerState => 
      reducerState.past && reducerState.past.length > 0
    )
  );
  const canRedo = useSelector(state => 
    Object.values(state).some(reducerState => 
      reducerState.future && reducerState.future.length > 0
    )
  );

  return (
    <div className="undo-redo-controls">
      <button 
        onClick={() => dispatch(undo())}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
      >
        Undo
      </button>
      <button 
        onClick={() => dispatch(redo())}
        disabled={!canRedo}
        title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
      >
        Redo
      </button>
    </div>
  );
};

export default UndoRedoControls;