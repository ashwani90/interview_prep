// modalReducer.js
const initialState = {
    modals: [], // Array of active modals
  };
  
  export default function modalReducer(state = initialState, action) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          modals: [
            ...state.modals,
            {
              id: action.payload.id,
              type: action.payload.type,
              props: action.payload.props || {},
            },
          ],
        };
  
      case 'CLOSE_MODAL':
        return {
          ...state,
          modals: state.modals.filter(modal => modal.id !== action.payload),
        };
  
      case 'CLOSE_ALL_MODALS':
        return {
          ...state,
          modals: [],
        };
  
      default:
        return state;
    }
  }