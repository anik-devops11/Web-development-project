import React from 'react';
import Spinner from './Spinner';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'success', 'danger', 'warning'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  loading = false,
  icon = null,
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'success':
        return 'btn-success';
      case 'danger':
        return 'btn-danger';
      case 'warning':
        return 'btn-warning';
      default:
        return 'btn-primary';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return { padding: '8px 16px', fontSize: 'var(--font-size-xs)' };
      case 'lg':
        return { padding: '18px 36px', fontSize: 'var(--font-size-md)' };
      default:
        return {}; // default styles from global.css class
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-3d ${getVariantClass()} ${className}`}
      style={getSizeStyle()}
      {...props}
    >
      {loading && <Spinner size="sm" color="white" style={{ marginRight: '8px' }} />}
      {!loading && icon && <span className="btn-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
