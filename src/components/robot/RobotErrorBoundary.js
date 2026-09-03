import React from 'react';

// Catches WebGL/GLTF/runtime failures inside the robot canvas so a 3D crash
// can never take down the rest of the portfolio.
class RobotErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.warn('[Robot] falling back to 2D representation:', error?.message || error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default RobotErrorBoundary;
