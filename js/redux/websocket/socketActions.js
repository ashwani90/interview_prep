// socketActions.js
export const connectWebSocket = (url) => ({
    type: 'WS_CONNECT',
    payload: { url }
  });
  
  export const disconnectWebSocket = () => ({
    type: 'WS_DISCONNECT'
  });
  
  export const sendSocketMessage = (message) => ({
    type: 'WS_SEND',
    payload: message
  });
  
  // Helper action to send authenticated message
  export const sendAuthenticatedMessage = (message) => (dispatch, getState) => {
    const { user } = getState().auth;
    dispatch(sendSocketMessage({
      ...message,
      token: user?.token
    }));
  };