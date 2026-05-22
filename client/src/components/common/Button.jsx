const variants = {
  primary: {
    background: 'var(--color-accent)',
    color: 'var(--color-accent-text)',
    border: 'none',
    hoverBg: 'var(--color-accent-hover)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    hoverBg: 'var(--color-surface-raised)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    border: 'none',
    hoverBg: 'var(--color-surface-raised)',
  },
  danger: {
    background: 'transparent',
    color: 'var(--color-danger)',
    border: '1px solid var(--color-border)',
    hoverBg: 'var(--color-surface-raised)',
  },
};

const sizes = {
  sm: { padding: '5px 10px', fontSize: '0.8rem' },
  md: { padding: '8px 14px', fontSize: '0.85rem' },
  lg: { padding: '10px 20px', fontSize: '0.9rem' },
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  style: customStyle = {},
  ...props
}) => {
  const v = variants[variant];
  const s = sizes[size];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        borderRadius: 'var(--radius-md)',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background var(--transition), border-color var(--transition)',
        background: v.background,
        color: v.color,
        border: v.border,
        ...s,
        ...customStyle,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = v.hoverBg;
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.background = v.background;
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
