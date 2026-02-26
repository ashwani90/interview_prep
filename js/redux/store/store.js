// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { tokenMiddleware } from './tokenMiddleware';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, tokenMiddleware)
);

export default store;