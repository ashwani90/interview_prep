// AnyComponent.js
import ErrorBoundary from './ErrorBoundary';

function Dashboard() {
  return (
    <ErrorBoundary 
      fallback={(reset) => (
        <div>
          Dashboard failed to load
          <button onClick={reset}>Retry</button>
        </div>
      )}
    >
      <DashboardContent />
    </ErrorBoundary>
  );
}