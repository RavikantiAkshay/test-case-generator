import { HiOutlinePlus } from 'react-icons/hi2';

const DashboardPage = () => {
  return (
    <div className="animate-in">
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '2rem',
      }}>
        <div>
          <h1 style={{
            fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em',
            marginBottom: '2px',
          }}>
            Projects
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            Manage your projects and test generations.
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '8px 14px',
          background: 'var(--color-accent)', color: 'var(--color-accent-text)',
          border: 'none', borderRadius: 'var(--radius-md)',
          fontWeight: 500, fontSize: '0.85rem', cursor: 'pointer',
          transition: 'background var(--transition)',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-accent-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-accent)'}
        >
          <HiOutlinePlus size={16} />
          New project
        </button>
      </div>

      {/* Empty State */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '4rem 2rem',
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-lg)',
      }}>
        <p style={{
          fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem',
        }}>
          No projects yet
        </p>
        <p style={{
          color: 'var(--color-text-secondary)', fontSize: '0.84rem',
        }}>
          Create your first project to start generating test cases.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
