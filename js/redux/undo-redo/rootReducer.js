import { combineReducers } from 'redux';
import undoable from './undoableReducer';
import counter from './counterReducer';

const rootReducer = combineReducers({
  counter: undoable(counter)
  // other undoable reducers...
});

export default rootReducer;