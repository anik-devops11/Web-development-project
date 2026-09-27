import React from 'react';

const SkeletonLoader = ({
  width = '100%',
  height = '20px',
  shape = 'rectangle', // 'circle', 'rectangle', 'text'
  count = 1,
  className = '',
  style = {}
}) => {
  const items = Array.from({ length: count });

  const getStyle = () => {
    const base = {
      width,
      height,
      ...style
    };

    if (shape === 'circle') {
      base.borderRadius = '50%';
      base.aspectRatio = '1 / 1';
      base.height = width; // keep it a perfect circle if only width is passed
    } else if (shape === 'text') {
      base.borderRadius = '4px';
      base.height = '14px';
    }

    return base;
  };

  return (
    <>
      {items.map((_, index) => (
        <div
          key={index}
          className={`skeleton ${className}`}
          style={getStyle()}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
