import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-8">
          <div className="max-w-md text-center">
            <p className="font-mono text-accent text-xs tracking-widest mb-4">RUNTIME ERROR</p>
            <h1 className="font-display text-2xl text-ink mb-3">Something went wrong</h1>
            <p className="text-mute mb-6 text-sm">A component failed to render. A reload usually resolves it.</p>
            <button
              data-testid="error-reload-btn"
              onClick={() => window.location.reload()}
              className="rounded-md bg-accent px-5 py-2.5 font-mono text-xs tracking-wider text-[#0a0c11] hover:brightness-110"
            >
              RELOAD
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
