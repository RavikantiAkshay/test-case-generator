const StatsGrid = ({ projects }) => {
  const totalGenerations = projects.reduce((sum, p) => sum + (p.generationCount || 0), 0);
  const mostRecent = projects.reduce((latest, p) => {
    const d = p.lastGeneratedAt ? new Date(p.lastGeneratedAt) : null;
    return d && (!latest || d > latest) ? d : latest;
  }, null);

  const stats = [
    { label: 'Total Projects', value: projects.length },
    { label: 'Total Generations', value: totalGenerations },
    { label: 'Last Generated', value: mostRecent ? mostRecent.toLocaleDateString() : '—' },
  ];

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem',
      marginBottom: '1.5rem',
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{
          padding: '0.85rem 1rem',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            {stat.value}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
