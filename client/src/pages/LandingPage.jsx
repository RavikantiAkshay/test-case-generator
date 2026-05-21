import { Link } from 'react-router-dom';
import {
  HiOutlineBeaker,
  HiOutlineBolt,
  HiOutlineCpuChip,
  HiOutlineCodeBracket,
  HiOutlineChatBubbleLeftRight,
  HiOutlineDocumentArrowDown,
  HiOutlineCircleStack,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import useUIStore from '../store/uiStore';
import useAuthStore from '../store/authStore';

const features = [
  {
    icon: HiOutlineCpuChip,
    title: 'AI-Powered Generation',
    description: 'Generate unit tests, integration tests, API tests, edge-case tests, and more using advanced AI models.',
    color: '#6366f1',
  },
  {
    icon: HiOutlineCodeBracket,
    title: 'Repository Analysis',
    description: 'Upload a ZIP or connect GitHub. We detect frameworks, routes, models, and architecture automatically.',
    color: '#06b6d4',
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: 'AI Chat Assistant',
    description: 'Ask follow-up questions: explain tests, generate edge cases, improve assertions, identify gaps.',
    color: '#8b5cf6',
  },
  {
    icon: HiOutlineDocumentArrowDown,
    title: 'Export Anywhere',
    description: 'Export generated test cases as Markdown, PDF, or JSON. One-click copy to clipboard.',
    color: '#10b981',
  },
  {
    icon: HiOutlineCircleStack,
    title: 'Memory & Embeddings',
    description: 'Historical generations improve future outputs through semantic retrieval and context injection.',
    color: '#f59e0b',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Feedback Loop',
    description: 'Approve, reject, rate, and regenerate. Your feedback continuously refines AI output quality.',
    color: '#ef4444',
  },
];

const LandingPage = () => {
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* ─── Navbar ─── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          background: isDarkMode ? 'rgba(10, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HiOutlineBeaker style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }} />
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text)' }}>
            TestGen<span style={{ color: 'var(--color-primary)' }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            }}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              style={{
                padding: '0.55rem 1.25rem',
                background: 'var(--gradient-primary)',
                color: '#fff',
                borderRadius: 'var(--radius-md)',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              Dashboard <HiOutlineArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: '0.55rem 1.25rem',
                  color: 'var(--color-text)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: '0.55rem 1.25rem',
                  background: 'var(--gradient-primary)',
                  color: '#fff',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 2rem 4rem',
          background: isDarkMode
            ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1033 40%, #0d1520 70%, #0a0a0f 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 40%, #ecfeff 70%, #f8fafc 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background orbs */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            top: '-100px',
            right: '-100px',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
            bottom: '-50px',
            left: '-50px',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="animate-fade-in-up"
          style={{ textAlign: 'center', maxWidth: '800px', position: 'relative', zIndex: 1 }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 1rem',
              borderRadius: '999px',
              background: isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: 'var(--color-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}
          >
            <HiOutlineSparkles size={16} />
            AI-Powered Test Case Generation
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              color: 'var(--color-text)',
            }}
          >
            Generate Intelligent{' '}
            <span className="gradient-text">Test Cases</span>
            {' '}for Your Codebase
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Upload your repository, let AI analyze your architecture, and generate 
            comprehensive test suites — unit tests, integration tests, API tests, and edge cases. 
            All in one platform.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to={isAuthenticated ? '/dashboard' : '/signup'}
              style={{
                padding: '0.85rem 2rem',
                background: 'var(--gradient-primary)',
                color: '#fff',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.4)';
              }}
            >
              <HiOutlineBolt size={20} />
              Start Generating Tests
            </Link>
            <a
              href="https://github.com/RavikantiAkshay/test-case-generator"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.85rem 2rem',
                background: 'transparent',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 600,
                fontSize: '1.05rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text)';
              }}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section
        style={{
          padding: '5rem 2rem',
          background: 'var(--color-bg)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
                color: 'var(--color-text)',
              }}
            >
              Everything You Need for{' '}
              <span className="gradient-text">AI Testing</span>
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--color-text-secondary)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              A complete platform to analyze, generate, iterate, and export test cases using AI.
            </p>
          </div>

          {/* Feature Grid */}
          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  transition: 'all var(--transition-base)',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = feature.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 30px ${feature.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-lg)',
                    background: `${feature.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--color-text)',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section
        style={{
          padding: '5rem 2rem',
          background: isDarkMode
            ? 'linear-gradient(135deg, #1a1033 0%, #0a0a0f 100%)'
            : 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 800,
              marginBottom: '1rem',
              color: 'var(--color-text)',
            }}
          >
            Ready to Supercharge Your Testing?
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '2rem',
            }}
          >
            Join developers who are using AI to generate better test cases, faster.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/signup'}
            style={{
              padding: '0.85rem 2.5rem',
              background: 'var(--gradient-primary)',
              color: '#fff',
              borderRadius: 'var(--radius-lg)',
              fontWeight: 700,
              fontSize: '1.1rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
            }}
          >
            Get Started Free <HiOutlineArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          padding: '2rem',
          textAlign: 'center',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text-muted)',
          fontSize: '0.85rem',
        }}
      >
        <p>
          © {new Date().getFullYear()} TestGenAI — Built with{' '}
          <span style={{ color: 'var(--color-primary)' }}>React</span>,{' '}
          <span style={{ color: 'var(--color-primary)' }}>Node.js</span>, and{' '}
          <span style={{ color: 'var(--color-primary)' }}>Groq AI</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
