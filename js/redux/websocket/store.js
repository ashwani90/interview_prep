// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { websocketMiddleware } from './websocketMiddleware';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, websocketMiddleware)
);

export default store;