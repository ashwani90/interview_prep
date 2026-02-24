// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routeMiddleware } from './routeMiddleware';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, routeMiddleware)
);