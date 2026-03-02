const initialState = 0;

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'SUBTRACT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
};

export default counterReducer;