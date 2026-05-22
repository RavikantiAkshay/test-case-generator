const RouteList = ({ routes }) => {
  if (!routes || routes.length === 0) {
    return (
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        No API routes detected.
      </p>
    );
  }

  return (
    <div style={{
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 1fr',
        gap: '0.5rem',
        padding: '8px 12px',
        background: 'var(--color-bg-subtle)',
        borderBottom: '1px solid var(--color-border)',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        color: 'var(--color-text-muted)',
      }}>
        <span>Method</span>
        <span>Path</span>
        <span>File</span>
      </div>
      {/* Rows */}
      {routes.map((route, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 1fr',
            gap: '0.5rem',
            padding: '7px 12px',
            borderBottom: i < routes.length - 1 ? '1px solid var(--color-border)' : 'none',
            fontSize: '0.82rem',
            transition: 'background var(--transition)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-subtle)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <span style={{
            fontWeight: 600,
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: '0.75rem',
          }}>
            {route.method}
          </span>
          <span style={{
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            fontSize: '0.78rem',
            color: 'var(--color-text)',
          }}>
            {route.path}
          </span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
            {route.file}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RouteList;
