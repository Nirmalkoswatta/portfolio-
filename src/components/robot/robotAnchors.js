// Safe screen-space anchor positions the robot is allowed to occupy.
// Kept intentionally small (2 slots) so the state machine only ever has
// one valid "other side" to jump to - matches spec: no arbitrary coordinates.
export const ANCHORS = {
  left: { side: 'left', offset: 0 },
  right: { side: 'right', offset: 0 },
};

export const otherAnchor = (anchor) => (anchor === 'left' ? 'right' : 'left');

// Box size (px) for the fixed wrapper per breakpoint. Chosen so the robot
// reads as a real character on first viewport without covering copy/CTAs.
export const getBoxSize = () => {
  const w = window.innerWidth;
  if (w < 640) return 260; // mobile
  if (w < 1024) return 380; // tablet
  return 520; // desktop
};

export const isMobileViewport = () => window.innerWidth < 640;
