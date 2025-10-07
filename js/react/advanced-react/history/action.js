export const createAction = (type, payload, executeFn, undoFn, redoFn) => ({
    type,
    payload,
    execute: executeFn,
    undo: undoFn,
    redo: redoFn || executeFn, // Default redo is same as execute
  });
  
  // Example action creators
  export const createAddItemAction = (item) => createAction(
    'ADD_ITEM',
    { item },
    (state) => [...state, item],
    (state) => state.filter(i => i.id !== item.id)
  );
  
  export const createRemoveItemAction = (item) => createAction(
    'REMOVE_ITEM',
    { item },
    (state) => state.filter(i => i.id !== item.id),
    (state) => [...state, item]
  );
  
  export const createUpdateItemAction = (itemId, updates, previousValues) => createAction(
    'UPDATE_ITEM',
    { itemId, updates, previousValues },
    (state) => state.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ),
    (state) => state.map(item => 
      item.id === itemId ? { ...item, ...previousValues } : item
    )
  );