import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Update state with error information
    this.setState({ hasError: true, error:error, errorInfo:errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI for when an error occurs
      return (
        <div>
          <h2>Something went wrong</h2>
          <p>Sorry, an error occurred. Please try again later.</p>
          {this.state.error && <p>Error: {this.state.error.message}</p>}
        </div>
      );
    }

    // Render the children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
