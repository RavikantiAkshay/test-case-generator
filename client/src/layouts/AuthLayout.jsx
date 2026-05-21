import { Link } from 'react-router-dom';
import { HiOutlineBeaker, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import useUIStore from '../store/uiStore';

const AuthLayout = ({ children, title, subtitle, linkText, linkTo, linkLabel }) => {
  const { isDarkMode, toggleDarkMode } = useUIStore();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-bg)',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 2rem', height: '56px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          textDecoration: 'none', color: 'var(--color-text)',
          fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em',
        }}>
          <HiOutlineBeaker style={{ fontSize: '1.2rem' }} />
          <span>TestGenAI</span>
        </Link>
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
      </header>

      {/* Content */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}>
        <div className="animate-in" style={{ width: '100%', maxWidth: '380px' }}>
          {/* Title */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '0.25rem',
            }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem' }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Form */}
          {children}

          {/* Link */}
          {linkText && linkTo && (
            <p style={{
              textAlign: 'center', marginTop: '1.5rem',
              fontSize: '0.85rem', color: 'var(--color-text-secondary)',
            }}>
              {linkLabel}{' '}
              <Link to={linkTo} style={{
                color: 'var(--color-text)', fontWeight: 600, textDecoration: 'underline',
                textUnderlineOffset: '2px',
              }}>
                {linkText}
              </Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
