import { useState, useEffect } from 'react';
import { metricsService } from '../services/metricsService';

export const useMetrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    metricsService.connect();
    setIsConnected(true);

    const unsubscribe = metricsService.subscribe((data) => {
      setMetrics(prev => [...prev.slice(-50), data]); // Keep last 50 data points
    });

    return () => {
      unsubscribe();
      metricsService.disconnect();
    };
  }, []);

  const togglePause = () => {
    if (isPaused) {
      metricsService.resume();
    } else {
      metricsService.pause();
    }
    setIsPaused(!isPaused);
  };

  return { metrics, isConnected, isPaused, togglePause };
};