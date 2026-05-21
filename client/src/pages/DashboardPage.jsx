import { HiOutlineFolderPlus, HiOutlineSparkles } from 'react-icons/hi2';

const DashboardPage = () => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--color-text)',
            marginBottom: '0.35rem',
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Manage your projects and view recent test generations.
        </p>
      </div>

      {/* Empty State (Phase 2 will populate with real data) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <HiOutlineSparkles size={36} style={{ color: 'var(--color-primary)' }} />
        </div>
        <h2
          style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '0.5rem',
          }}
        >
          No Projects Yet
        </h2>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: '1.5rem',
            maxWidth: '400px',
          }}
        >
          Create your first project to start generating AI-powered test cases for your codebase.
        </p>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--gradient-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'transform var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <HiOutlineFolderPlus size={20} />
          Create Project
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
