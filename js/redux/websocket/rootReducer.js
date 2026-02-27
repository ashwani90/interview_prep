// rootReducer.js
import { combineReducers } from 'redux';
import socket from './socketReducer';

export default combineReducers({
  socket,
  // ...your other reducers
});