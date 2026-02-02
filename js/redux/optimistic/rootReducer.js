// rootReducer.js
import { combineReducers } from 'redux';
import optimistic from './optimisticReducer';

export default combineReducers({
  optimistic,
  // ...your other reducers
});