import { Outlet, Link, useNavigate } from 'react-router-dom';
import { HiOutlineBeaker, HiOutlineMoon, HiOutlineSun, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';

const MainLayout = () => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 2rem', height: '56px',
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <Link to="/dashboard" style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          textDecoration: 'none', color: 'var(--color-text)',
          fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em',
        }}>
          <HiOutlineBeaker style={{ fontSize: '1.2rem' }} />
          <span>TestGenAI</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            style={{
              background: 'none', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)', padding: '6px',
              cursor: 'pointer', color: 'var(--color-text)', display: 'flex',
            }}
          >
            {isDarkMode ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
          </button>

          {/* User */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '4px 10px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            fontSize: '0.83rem', fontWeight: 500,
          }}>
            <div style={{
              width: '22px', height: '22px', borderRadius: '50%',
              background: 'var(--color-accent)', color: 'var(--color-accent-text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 700,
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            {user?.name || 'User'}
          </div>

          <button
            onClick={handleLogout}
            title="Log out"
            style={{
              background: 'none', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)', padding: '6px',
              cursor: 'pointer', color: 'var(--color-danger)', display: 'flex',
              transition: 'border-color var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-strong)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <HiOutlineArrowRightOnRectangle size={16} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
