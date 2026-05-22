const Skeleton = ({ width = '100%', height = '1rem', borderRadius = 'var(--radius-md)', style = {} }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: 'var(--color-surface-raised)',
        animation: 'skeleton-pulse 1.5s ease-in-out infinite',
        ...style,
      }}
    />
  );
};

// Inject the keyframe animation once
if (typeof document !== 'undefined') {
  const styleId = 'skeleton-styles';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
      @keyframes skeleton-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `;
    document.head.appendChild(styleEl);
  }
}

export default Skeleton;
