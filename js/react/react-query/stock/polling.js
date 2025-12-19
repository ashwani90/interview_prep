import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Mock API function to fetch stock price
const fetchStockPrice = async (symbol) => {
  // In a real app, this would be an actual API call
  const mockPrice = (Math.random() * 100).toFixed(2);
  return {
    symbol,
    price: mockPrice,
    timestamp: new Date().toLocaleTimeString(),
  };
};

const StockPriceTracker = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [isPolling, setIsPolling] = useState(true);
  const [pollInterval, setPollInterval] = useState(10000); // 10 seconds

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stockPrice', symbol],
    queryFn: () => fetchStockPrice(symbol),
    refetchInterval: isPolling ? pollInterval : false,
    refetchIntervalInBackground: true, // Continue polling when tab is inactive
    staleTime: 0, // Always consider data stale to ensure refetch
  });

  return (
    <div className="stock-tracker">
      <h2>Stock Price Tracker</h2>
      
      <div className="controls">
        <div>
          <label>
            Stock Symbol:
            <input 
              type="text" 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
          </label>
        </div>
        
        <div>
          <label>
            Polling Interval (ms):
            <input
              type="number"
              value={pollInterval}
              onChange={(e) => setPollInterval(Number(e.target.value))}
              min="1000"
              step="1000"
            />
          </label>
        </div>
        
        <button onClick={() => setIsPolling(!isPolling)}>
          {isPolling ? 'Stop Polling' : 'Start Polling'}
        </button>
      </div>

      <div className="stock-data">
        {isLoading ? (
          <p>Loading initial data...</p>
        ) : isError ? (
          <p className="error">Error: {error.message}</p>
        ) : (
          <>
            <h3>{data.symbol}</h3>
            <p className="price">${data.price}</p>
            <p className="timestamp">Last updated: {data.timestamp}</p>
            <p className="status">
              {isPolling ? (
                <span className="polling-active">Live polling active</span>
              ) : (
                <span className="polling-inactive">Polling paused</span>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default StockPriceTracker;