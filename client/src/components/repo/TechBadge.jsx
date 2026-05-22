const categoryColors = {
  framework: { bg: 'var(--color-surface-raised)', border: 'var(--color-border-strong)' },
  database: { bg: 'var(--color-surface-raised)', border: 'var(--color-border-strong)' },
  language: { bg: 'var(--color-surface-raised)', border: 'var(--color-border-strong)' },
  testing: { bg: 'var(--color-surface-raised)', border: 'var(--color-border-strong)' },
  tool: { bg: 'var(--color-surface-raised)', border: 'var(--color-border)' },
};

const TechBadge = ({ name, category }) => {
  const style = categoryColors[category] || categoryColors.tool;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: '999px',
      fontSize: '0.78rem',
      fontWeight: 500,
      background: style.bg,
      border: `1px solid ${style.border}`,
      color: 'var(--color-text)',
      whiteSpace: 'nowrap',
    }}>
      {name}
    </span>
  );
};

export default TechBadge;
