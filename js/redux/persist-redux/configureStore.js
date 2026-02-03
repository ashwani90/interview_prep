import { createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from '../utils/storage';
import { debounce } from '../utils/debounce';
import rootReducer from './reducers';

// Load initial state from localStorage
const persistedState = loadState();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    persistedState, // Initial state
    applyMiddleware(/* your middleware */)
  );

  // Subscribe to store changes and save to localStorage
  store.subscribe(
    debounce(() => {
      // Only persist specific slices of state
      const state = store.getState();
      saveState({
        auth: state.auth,
        cart: state.cart
        // Add other slices you want to persist
      });
    }, 1000) // Debounce for 1 second
  );

  return store;
};

export default configureStore;