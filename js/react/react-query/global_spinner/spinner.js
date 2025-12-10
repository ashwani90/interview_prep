import { useIsFetching } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material'; // or your spinner component
import './GlobalSpinner.css';

const GlobalSpinner = () => {
  // Returns the number of queries currently fetching
  const isFetching = useIsFetching();

  return isFetching ? (
    <div className="global-spinner-overlay">
      <div className="global-spinner-content">
        <CircularProgress size={60} />
        <p>Loading data...</p>
      </div>
    </div>
  ) : null;
};

// Add this to your root component (App.jsx or similar)
const App = () => {
  return (
    <>
      <GlobalSpinner />
      {/* Your app content */}
    </>
  );
};