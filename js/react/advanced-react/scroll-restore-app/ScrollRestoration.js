// src/components/ScrollRestoration.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollPositions = new Map();

const ScrollRestoration = () => {
  const location = useLocation();

  // Save scroll position before route change
  useEffect(() => {
    const handleBeforeUnload = () => {
      scrollPositions.set(location.key, window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      scrollPositions.set(location.key, window.scrollY);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);

  // Restore scroll position after route change
  useEffect(() => {
    const savedY = scrollPositions.get(location.key) || 0;
    window.scrollTo(0, savedY);
  }, [location]);

  return null;
};

export default ScrollRestoration;
