import React from 'react';

const ProgressBar = ({
  value = 0, // 0 to 100 or current steps count
  max = 100, // total steps
  showText = false,
  textLabel = '',
  color = 'linear-gradient(90deg, var(--primary) 0%, #8B5CF6 100%)',
  className = '',
  height = '12px'
}) => {
  const percentage = Math.max(0, Math.min(100, Math.round((value / max) * 100)));

  return (
    <div className={`progress-bar-container ${className}`} style={{ width: '100%' }}>
      {showText && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: 'var(--font-size-sm)',
          fontWeight: '600',
          color: 'var(--text-secondary)'
        }}>
          <span>{textLabel}</span>
          <span>{percentage}%</span>
        </div>
      )}
      
      <div style={{
        width: '100%',
        height: height,
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-round)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: color,
          borderRadius: 'var(--radius-round)',
          transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle micro-animation glow */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
            animation: 'progressBarShine 2.5s infinite linear',
            backgroundSize: '200% 100%'
          }} />
        </div>
      </div>

      <style>
        {`
          @keyframes progressBarShine {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
};

export default ProgressBar;
