import { saveState } from '../utils/storage';
import { debounce } from '../utils/debounce';

const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Debounced save after certain actions
  if (action.type === 'LOGIN_SUCCESS' || 
      action.type === 'LOGOUT' ||
      action.type === 'ADD_TO_CART' ||
      action.type === 'REMOVE_FROM_CART') {
    debouncedPersist(store.getState());
  }
  
  return result;
};

const debouncedPersist = debounce((state) => {
  saveState({
    auth: state.auth,
    cart: state.cart
  });
}, 1000);

export default persistenceMiddleware;