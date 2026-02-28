import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import undoMiddleware from './middleware/undoMiddleware';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(undoMiddleware)
  );

  return store;
};

export default configureStore;