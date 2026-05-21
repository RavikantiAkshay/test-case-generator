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
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background var(--transition-base)' }}>
      {/* Top Navigation */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 2rem',
          background: isDarkMode ? 'rgba(10, 10, 15, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Logo */}
        <Link
          to="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'var(--color-text)',
            fontWeight: 700,
            fontSize: '1.15rem',
          }}
        >
          <HiOutlineBeaker style={{ fontSize: '1.35rem', color: 'var(--color-primary)' }} />
          <span>TestGen<span style={{ color: 'var(--color-primary)' }}>AI</span></span>
        </Link>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem',
              cursor: 'pointer',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              transition: 'all var(--transition-fast)',
            }}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>

          {/* User Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              fontSize: '0.875rem',
              color: 'var(--color-text)',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span style={{ fontWeight: 500 }}>{user?.name || 'User'}</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem',
              cursor: 'pointer',
              color: 'var(--color-error)',
              display: 'flex',
              alignItems: 'center',
              transition: 'all var(--transition-fast)',
            }}
            title="Logout"
          >
            <HiOutlineArrowRightOnRectangle size={18} />
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
