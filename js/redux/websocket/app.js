// App.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connectWebSocket } from './socketActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const wsUrl = process.env.REACT_APP_WS_URL || 'wss://your-api.com/ws';
    dispatch(connectWebSocket(wsUrl));

    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

  return (
    // Your app content
  );
}