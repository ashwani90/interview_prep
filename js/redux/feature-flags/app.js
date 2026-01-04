// App.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFlags } from './featureFlagsActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlags());
    
    // Optional: Refresh flags periodically
    const interval = setInterval(() => {
      dispatch(fetchFlags());
    }, 300000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    // Your app content
  );
}