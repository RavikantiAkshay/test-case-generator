const ModelList = ({ models }) => {
  if (!models || models.length === 0) {
    return (
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        No database models detected.
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {models.map((model, i) => (
        <div
          key={i}
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          {/* Model header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            background: 'var(--color-bg-subtle)',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{model.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{model.file}</span>
          </div>
          {/* Fields */}
          {model.fields?.length > 0 && (
            <div style={{ padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {model.fields.map((field, j) => (
                <span
                  key={j}
                  style={{
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-surface-raised)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.78rem',
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {field}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModelList;
