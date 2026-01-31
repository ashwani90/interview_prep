// optimisticReducer.js
const initialState = {
    transactions: {}, // Track ongoing optimistic updates
    data: {} // Your actual application data
  };
  
  export default function optimisticReducer(state = initialState, action) {
    switch (action.type) {
      // Normal data update (non-optimistic)
      case 'UPDATE_DATA_SUCCESS':
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.key]: action.payload.value
          }
        };
  
      // Optimistic update
      case 'OPTIMISTIC_UPDATE_START':
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.key]: action.payload.optimisticValue
          },
          transactions: {
            ...state.transactions,
            [action.payload.transactionId]: {
              key: action.payload.key,
              previousValue: state.data[action.payload.key],
              optimisticValue: action.payload.optimisticValue
            }
          }
        };
  
      // Successful update - clean up transaction
      case 'OPTIMISTIC_UPDATE_SUCCESS':
        const { [action.payload.transactionId]: _, ...remainingTransactions } = state.transactions;
        return {
          ...state,
          transactions: remainingTransactions
        };
  
      // Failed update - rollback
      case 'OPTIMISTIC_UPDATE_FAILURE':
        const transaction = state.transactions[action.payload.transactionId];
        const { [action.payload.transactionId]: __, ...newTransactions } = state.transactions;
        
        return {
          ...state,
          data: {
            ...state.data,
            [transaction.key]: transaction.previousValue
          },
          transactions: newTransactions
        };
  
      default:
        return state;
    }
  }