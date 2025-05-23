import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: null | Error;
};

export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  state: State = {
    error: null,
  };

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (!error) {
      return children;
    }

    return <div>Error</div>;
  }
}
