import React from "react";

/**
 * Error Boundary — catches runtime exceptions in child components
 * and displays a fallback UI instead of crashing the entire page.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error so developers can debug
    console.error("[ErrorBoundary] Caught an error:", error);
    if (errorInfo?.componentStack) {
      console.error("[ErrorBoundary] Component stack:", errorInfo.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      // Allow rendering a custom fallback or use the default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
            color: "#F5F5F5",
            backgroundColor: "#0B0B0B",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
          }}
        >
          <span style={{ fontSize: "32px", marginBottom: "16px" }}>⚠️</span>
          <p style={{ fontSize: "15px", color: "#D4AF37", marginBottom: "8px" }}>
            Something went wrong
          </p>
          <p style={{ fontSize: "13px", color: "#666", maxWidth: "400px" }}>
            The assistant encountered an unexpected error. Please refresh the page and try again.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              marginTop: "20px",
              padding: "10px 24px",
              borderRadius: "8px",
              border: "1px solid #D4AF37",
              backgroundColor: "transparent",
              color: "#D4AF37",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
