import persistenceMiddleware from '../middleware/persistence';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(persistenceMiddleware, /* other middleware */)
  );
  
  return store;
};