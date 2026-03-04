const undoable = (reducer) => {
    // Initial state
    const initialState = {
      past: [],
      present: reducer(undefined, {}),
      future: []
    };
  
    return (state = initialState, action) => {
      const { past, present, future } = state;
  
      switch (action.type) {
        case 'UNDO':
          if (past.length === 0) return state;
          
          const previous = past[past.length - 1];
          const newPast = past.slice(0, past.length - 1);
          
          return {
            past: newPast,
            present: previous,
            future: [present, ...future]
          };
  
        case 'REDO':
          if (future.length === 0) return state;
          
          const next = future[0];
          const newFuture = future.slice(1);
          
          return {
            past: [...past, present],
            present: next,
            future: newFuture
          };
  
        default:
          // Delegate to wrapped reducer
          const newPresent = reducer(present, action);
          
          if (present === newPresent) {
            return state;
          }
          
          return {
            past: [...past, present],
            present: newPresent,
            future: []
          };
      }
    };
  };
  
  export default undoable;