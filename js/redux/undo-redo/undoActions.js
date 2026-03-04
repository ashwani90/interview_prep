export const undo = () => ({
    type: 'UNDO'
  });
  
  export const redo = () => ({
    type: 'REDO'
  });
  
  export const undoableActionTypes = ['ADD', 'SUBTRACT', 'RESET']; // Add your action types here