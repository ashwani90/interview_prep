// rootReducer.js
import { combineReducers } from 'redux';
import modal from './modalReducer';

export default combineReducers({
  modal,
  // ...your other reducers
});