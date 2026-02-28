// socketReducer.js
const initialState = {
    isConnected: false,
    lastMessage: null,
    error: null,
    reconnectAttempts: 0
  };
  
  export default function socketReducer(state = initialState, action) {
    switch (action.type) {
      case 'WS_CONNECTED':
        return {
          ...state,
          isConnected: true,
          error: null,
          reconnectAttempts: 0
        };
  
      case 'WS_DISCONNECTED':
        return {
          ...state,
          isConnected: false,
          lastMessage: null
        };
  
      case 'WS_ERROR':
        return {
          ...state,
          error: action.payload,
          isConnected: false
        };
  
      case 'WS_MESSAGE_RECEIVED':
        return {
          ...state,
          lastMessage: action.payload
        };
  
      case 'WS_RECONNECT_ATTEMPT':
        return {
          ...state,
          reconnectAttempts: state.reconnectAttempts + 1
        };
  
      default:
        return state;
    }
  }