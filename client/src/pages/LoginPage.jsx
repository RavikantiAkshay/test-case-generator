import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import AuthLayout from '../layouts/AuthLayout';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.7rem 0.85rem 0.7rem 2.75rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
  };

  const iconStyle = {
    position: 'absolute',
    left: '0.85rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted)',
    pointerEvents: 'none',
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to your TestGenAI workspace"
      linkText="Sign up"
      linkTo="/signup"
      linkLabel="Don't have an account?"
    >
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div style={{ marginBottom: '1rem', position: 'relative' }}>
          <HiOutlineEnvelope size={18} style={iconStyle} />
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
          <HiOutlineLockClosed size={18} style={iconStyle} />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ ...inputStyle, paddingRight: '2.75rem' }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
            }}
          >
            {showPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
          </button>
        </div>

        {/* Submit */}
        <button
          id="login-submit"
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.8rem',
            background: isLoading ? 'var(--color-text-muted)' : 'var(--gradient-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all var(--transition-fast)',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
