const Input = ({
  label,
  id,
  error,
  style: customStyle = {},
  ...props
}) => {
  return (
    <div style={{ marginBottom: '0.875rem' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: '0.82rem',
            fontWeight: 500,
            marginBottom: '4px',
            color: 'var(--color-text)',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        style={{
          width: '100%',
          padding: '9px 12px',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          fontSize: '0.88rem',
          outline: 'none',
          transition: 'border-color var(--transition)',
          ...customStyle,
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-strong)')}
        onBlur={(e) => (e.target.style.borderColor = error ? 'var(--color-danger)' : 'var(--color-border)')}
        {...props}
      />
      {error && (
        <p style={{ fontSize: '0.78rem', color: 'var(--color-danger)', marginTop: '3px' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
