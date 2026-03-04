import { undoableActionTypes } from '../actions/undoActions';

const undoMiddleware = store => next => action => {
  const result = next(action);
  
  // Check if action should be undoable
  if (undoableActionTypes.includes(action.type)) {
    // You could add additional logic here if needed
  }
  
  return result;
};

export default undoMiddleware;