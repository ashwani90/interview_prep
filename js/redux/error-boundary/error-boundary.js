// ErrorBoundary.js
import React from 'react';
import { connect } from 'react-redux';
import { errorOccurred, resetError } from './errorActions';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.dispatchError({
      error,
      errorInfo,
      componentStack: errorInfo.componentStack
    });
  }

  handleReset = () => {
    this.props.dispatchReset();
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError || this.props.error) {
      return this.props.fallback ? 
        this.props.fallback(this.handleReset) : 
        (
          <div className="error-fallback">
            <h2>Something went wrong</h2>
            <button onClick={this.handleReset}>Try again</button>
            {process.env.NODE_ENV === 'development' && (
              <details style={{ whiteSpace: 'pre-wrap' }}>
                {this.props.error?.toString()}
                <br />
                {this.props.componentStack}
              </details>
            )}
          </div>
        );
    }

    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  error: state.error.error,
  componentStack: state.error.componentStack
});

const mapDispatchToProps = {
  dispatchError: errorOccurred,
  dispatchReset: resetError
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);