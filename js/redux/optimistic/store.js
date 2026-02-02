// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { optimisticMiddleware } from './optimisticMiddleware';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, optimisticMiddleware)
);