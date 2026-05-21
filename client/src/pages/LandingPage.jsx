import { Link } from 'react-router-dom';
import {
  HiOutlineBeaker,
  HiOutlineCpuChip,
  HiOutlineCodeBracket,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentArrowDown,
  HiOutlineCircleStack,
  HiOutlineShieldCheck,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineArrowRight,
} from 'react-icons/hi2';
import useUIStore from '../store/uiStore';
import useAuthStore from '../store/authStore';

const features = [
  {
    icon: HiOutlineCpuChip,
    title: 'AI-Powered Generation',
    description: 'Generate unit, integration, API, and edge-case tests using advanced AI models.',
  },
  {
    icon: HiOutlineCodeBracket,
    title: 'Repository Analysis',
    description: 'Upload a ZIP or connect GitHub. We detect frameworks, routes, and architecture.',
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: 'AI Chat Assistant',
    description: 'Ask follow-up questions, generate edge cases, and improve assertions.',
  },
  {
    icon: HiOutlineDocumentArrowDown,
    title: 'Export Anywhere',
    description: 'Export test cases as Markdown, PDF, or JSON. One-click copy to clipboard.',
  },
  {
    icon: HiOutlineCircleStack,
    title: 'Memory & Embeddings',
    description: 'Historical generations improve future outputs through semantic retrieval.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Feedback Loop',
    description: 'Approve, reject, rate, and regenerate. Your feedback refines AI output.',
  },
];

const LandingPage = () => {
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ─── Navbar ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 2rem',
        height: '56px',
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <HiOutlineBeaker style={{ fontSize: '1.2rem' }} />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>
            TestGenAI
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            style={{
              background: 'none', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)', padding: '6px',
              cursor: 'pointer', color: 'var(--color-text)', display: 'flex',
              transition: 'border-color var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-strong)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            {isDarkMode ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
          </button>
          {isAuthenticated ? (
            <Link to="/dashboard" style={{
              padding: '6px 14px', background: 'var(--color-accent)', color: 'var(--color-accent-text)',
              borderRadius: 'var(--radius-md)', fontWeight: 500, fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', gap: '4px',
              transition: 'background var(--transition)',
            }}>
              Dashboard <HiOutlineArrowRight size={14} />
            </Link>
          ) : (
            <>
              <Link to="/login" style={{
                padding: '6px 14px', fontSize: '0.85rem', fontWeight: 500,
                color: 'var(--color-text-secondary)',
                transition: 'color var(--transition)',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                Log in
              </Link>
              <Link to="/signup" style={{
                padding: '6px 14px', background: 'var(--color-accent)', color: 'var(--color-accent-text)',
                borderRadius: 'var(--radius-md)', fontWeight: 500, fontSize: '0.85rem',
                transition: 'background var(--transition)',
              }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '160px', paddingBottom: '100px',
        paddingLeft: '1.5rem', paddingRight: '1.5rem',
      }}>
        <div className="animate-in" style={{ maxWidth: '620px' }}>
          {/* Pill */}
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '999px',
            border: '1px solid var(--color-border)',
            fontSize: '0.78rem',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            marginBottom: '1.5rem',
            letterSpacing: '0.02em',
          }}>
            AI-Powered Test Generation
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            marginBottom: '1.25rem',
          }}>
            Generate intelligent test cases for your codebase
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.65,
            maxWidth: '480px',
            margin: '0 auto 2rem',
          }}>
            Upload your repository, let AI analyze your architecture, and get comprehensive test suites — unit, integration, API, and edge cases.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link
              to={isAuthenticated ? '/dashboard' : '/signup'}
              style={{
                padding: '10px 22px',
                background: 'var(--color-accent)',
                color: 'var(--color-accent-text)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'background var(--transition)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-accent-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-accent)'}
            >
              Start Generating <HiOutlineArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/RavikantiAkshay/test-case-generator"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: '10px 22px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: 'var(--color-text)',
                transition: 'border-color var(--transition)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-strong)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ─── Divider ─── */}
      <div style={{ width: '100%', height: '1px', background: 'var(--color-border)' }} />

      {/* ─── Features ─── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '960px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '0.5rem',
          }}>
            Everything you need
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            A complete platform to generate, iterate, and export AI-powered test cases.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'var(--color-border)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          {features.map((feature, i) => (
            <div key={i} style={{
              padding: '1.75rem',
              background: 'var(--color-bg)',
              transition: 'background var(--transition)',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-subtle)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-bg)'}
            >
              <feature.icon size={20} style={{ color: 'var(--color-text-muted)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
      }}>
        <h2 style={{
          fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem',
        }}>
          Ready to start?
        </h2>
        <p style={{
          color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem',
        }}>
          Create an account and generate your first test suite in minutes.
        </p>
        <Link
          to={isAuthenticated ? '/dashboard' : '/signup'}
          style={{
            padding: '10px 24px',
            background: 'var(--color-accent)',
            color: 'var(--color-accent-text)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.9rem',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            transition: 'background var(--transition)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-accent-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--color-accent)'}
        >
          Get Started Free <HiOutlineArrowRight size={16} />
        </Link>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{
        marginTop: 'auto',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)',
      }}>
        © {new Date().getFullYear()} TestGenAI
      </footer>
    </div>
  );
};

export default LandingPage;
