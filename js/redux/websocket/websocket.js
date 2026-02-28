// websocketMiddleware.js
let socket = null;

export const websocketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'WS_CONNECT':
      if (socket !== null) {
        socket.close();
      }

      // Connect to the remote host
      const { url } = action.payload;
      socket = new WebSocket(url);

      // Set up event handlers
      socket.onopen = () => {
        store.dispatch({ type: 'WS_CONNECTED' });
        const { user } = store.getState().auth;
        if (user) {
          store.dispatch(sendSocketMessage({
            type: 'AUTHENTICATE',
            token: user.token
          }));
        }
      };

      socket.onclose = () => {
        store.dispatch({ type: 'WS_DISCONNECTED' });
        socket = null;
      };

      socket.onerror = (event) => {
        store.dispatch({ type: 'WS_ERROR', payload: event });
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        store.dispatch({
          type: 'WS_MESSAGE_RECEIVED',
          payload: message
        });

        // Dispatch additional actions based on message type
        switch (message.type) {
          case 'NEW_NOTIFICATION':
            store.dispatch({
              type: 'ADD_NOTIFICATION',
              payload: message.data
            });
            break;
            
          case 'DATA_UPDATE':
            store.dispatch({
              type: 'UPDATE_DATA',
              payload: message.data
            });
            break;
            
          // Add more message handlers as needed
        }
      };
      break;

    case 'WS_DISCONNECT':
      if (socket !== null) {
        socket.close();
      }
      socket = null;
      store.dispatch({ type: 'WS_DISCONNECTED' });
      break;

    case 'WS_SEND':
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(action.payload));
      }
      break;

    default:
      return next(action);
  }
};