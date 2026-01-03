// App.js
import ErrorBoundary from './ErrorBoundary';
import GlobalErrorHandler from './GlobalErrorHandler';

function App() {
  return (
    <ErrorBoundary>
      <GlobalErrorHandler />
      {/* Your app content */}
    </ErrorBoundary>
  );
}