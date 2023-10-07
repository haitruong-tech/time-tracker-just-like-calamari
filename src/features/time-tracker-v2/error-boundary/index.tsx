import React from "react";
import ErrorTimeTracker from "../placeholders/error";
import { toastError } from "src/lib/react-toastify";

interface TimeTrackerErrorBoundaryState {
  hasError: boolean;
}

class TimeTrackerErrorBoundary extends React.Component<
  { children: React.ReactNode },
  TimeTrackerErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): TimeTrackerErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    toastError(error.message);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorTimeTracker />;
    }
    return this.props.children;
  }
}

export default TimeTrackerErrorBoundary;
