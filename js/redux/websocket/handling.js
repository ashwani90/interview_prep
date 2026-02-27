// In your reducer or component
case 'WS_MESSAGE_RECEIVED':
  switch (action.payload.type) {
    case 'CHAT_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    // Handle other message types
  }


  // In your middleware or a service
const handleDisconnect = () => {
    const { reconnectAttempts } = store.getState().socket;
    const delay = Math.min(1000 * reconnectAttempts, 30000);
    
    setTimeout(() => {
      store.dispatch({ type: 'WS_RECONNECT_ATTEMPT' });
      store.dispatch(connectWebSocket(url));
    }, delay);
  };