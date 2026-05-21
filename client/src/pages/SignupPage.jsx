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

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
  });

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await signup(formData);
      toast.success('Account created');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start generating AI-powered test cases."
      linkText="Log in"
      linkTo="/login"
      linkLabel="Already have an account?"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.875rem' }}>
          <label htmlFor="signup-name" style={labelStyle}>Name</label>
          <input
            id="signup-name" type="text" name="name" placeholder="Your full name"
            value={formData.name} onChange={handleChange} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--color-border-strong)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <div style={{ marginBottom: '0.875rem' }}>
          <label htmlFor="signup-email" style={labelStyle}>Email</label>
          <input
            id="signup-email" type="email" name="email" placeholder="you@example.com"
            value={formData.email} onChange={handleChange} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--color-border-strong)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <div style={{ marginBottom: '0.875rem' }}>
          <label htmlFor="signup-password" style={labelStyle}>Password</label>
          <input
            id="signup-password" type="password" name="password" placeholder="Min 6 characters"
            value={formData.password} onChange={handleChange} required minLength={6}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--color-border-strong)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="signup-confirm" style={labelStyle}>Confirm password</label>
          <input
            id="signup-confirm" type="password" name="confirmPassword"
            placeholder="Re-enter password"
            value={formData.confirmPassword} onChange={handleChange} required
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--color-border-strong)'}
            onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>
        <button
          id="signup-submit" type="submit" disabled={isLoading}
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
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
