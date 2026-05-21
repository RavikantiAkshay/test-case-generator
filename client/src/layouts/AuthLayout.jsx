import { Link } from 'react-router-dom';
import { HiOutlineBeaker } from 'react-icons/hi2';
import useUIStore from '../store/uiStore';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

const AuthLayout = ({ children, title, subtitle, linkText, linkTo, linkLabel }) => {
  const { isDarkMode, toggleDarkMode } = useUIStore();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: isDarkMode
          ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1033 50%, #0a0a0f 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%)',
        transition: 'background var(--transition-base)',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 2rem',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'var(--color-text)',
            fontWeight: 700,
            fontSize: '1.25rem',
          }}
        >
          <HiOutlineBeaker style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }} />
          <span>TestGen<span style={{ color: 'var(--color-primary)' }}>AI</span></span>
        </Link>
        <button
          onClick={toggleDarkMode}
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem',
            cursor: 'pointer',
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            transition: 'all var(--transition-fast)',
          }}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
        </button>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div
          className="animate-fade-in"
          style={{
            width: '100%',
            maxWidth: '440px',
          }}
        >
          {/* Card */}
          <div
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              padding: '2.5rem',
              boxShadow: isDarkMode ? 'var(--shadow-lg)' : 'var(--shadow-md)',
            }}
          >
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                  color: 'var(--color-text)',
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Content */}
            {children}

            {/* Bottom Link */}
            {linkText && linkTo && (
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '1.5rem',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {linkLabel}{' '}
                <Link
                  to={linkTo}
                  style={{
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  {linkText}
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
