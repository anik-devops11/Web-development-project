import React from 'react';

const Spinner = ({ size = 'md', color = 'primary', className = '', style = {} }) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { width: '16px', height: '16px', borderSize: '2px' };
      case 'lg':
        return { width: '48px', height: '48px', borderSize: '4px' };
      default:
        return { width: '32px', height: '32px', borderSize: '3px' };
    }
  };

  const getColorVal = () => {
    if (color === 'white') return '#FFFFFF';
    if (color === 'primary') return 'var(--primary)';
    return color;
  };

  const dim = getDimensions();

  const spinnerStyle = {
    width: dim.width,
    height: dim.height,
    border: `${dim.borderSize} solid rgba(255, 255, 255, 0.1)`,
    borderTop: `${dim.borderSize} solid ${getColorVal()}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block',
    verticalAlign: 'middle',
    ...style
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className={`spinner-loader ${className}`} style={spinnerStyle} />
    </>
  );
};

export default Spinner;
