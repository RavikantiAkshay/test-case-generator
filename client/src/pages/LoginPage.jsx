import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg)',
  color: 'var(--color-text)',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color var(--transition)',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 500,
  marginBottom: '4px',
  color: 'var(--color-text)',
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success('Welcome back');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your workspace."
      linkText="Sign up"
      linkTo="/signup"
      linkLabel="Don't have an account?"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.875rem' }}>
          <label htmlFor="login-email" style={labelStyle}>Email</label>
          <input
            id="login-email" type="email" name="email" placeholder="you@example.com"
            value={formData.email} onChange={handleChange} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--color-border-strong)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="login-password" style={labelStyle}>Password</label>
          <input
            id="login-password" type="password" name="password" placeholder="Enter password"
            value={formData.password} onChange={handleChange} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--color-border-strong)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <button
          id="login-submit" type="submit" disabled={isLoading}
          style={{
            width: '100%', padding: '9px',
            background: isLoading ? 'var(--color-border-strong)' : 'var(--color-accent)',
            color: 'var(--color-accent-text)',
            border: 'none', borderRadius: 'var(--radius-md)',
            fontWeight: 600, fontSize: '0.88rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background var(--transition)',
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
