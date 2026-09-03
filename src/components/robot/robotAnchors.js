// Safe screen-space anchor positions the robot is allowed to occupy.
// Kept intentionally small (2 slots) so the state machine only ever has
// one valid "other side" to jump to - matches spec: no arbitrary coordinates.
export const ANCHORS = {
  left: { side: 'left', offset: 0 },
  right: { side: 'right', offset: 0 },
};

export const otherAnchor = (anchor) => (anchor === 'left' ? 'right' : 'left');

// Box size (px) for the robot's wrapper per breakpoint. Sized to fit inside
// the Hero's right column with room left over for the left/right teleport
// travel, while still reading as a real character.
export const getBoxSize = () => {
  const w = window.innerWidth;
  if (w < 640) return 220; // mobile
  if (w < 1024) return 300; // tablet
  return 360; // desktop
};

export const isMobileViewport = () => window.innerWidth < 640;
