import React, { Component } from "react";
import NotFound from "../../containers/NotFound";

interface Error {
  stack?: string;
}

class ErrorBoundary extends Component {
  state = {
    errorMessage: "",
  };

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.toString() };
  }

  // eslint-disable-next-line no-console
  logErrorToServices = console.log;
  

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }

  render() {
    if (this.state.errorMessage) {
      return <NotFound label="Something went wrong!" isErrorBoundary />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
