import React, { useEffect, useState } from 'react';
import { useAudio } from '../../hooks/useAudio';

const Timer = ({
  duration = 60, // total seconds
  elapsed = 0, // elapsed seconds
  size = 64, // diameter size of circle
  strokeWidth = 5,
  dangerThresholdPercent = 20, // threshold in % to alert red
  warningThresholdPercent = 50 // threshold in % to alert orange
}) => {
  const { playSound } = useAudio();
  const remaining = Math.max(0, duration - elapsed);
  const remainingPercent = (remaining / duration) * 100;

  // Format time to MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Play a warning tick sound every second if in danger zone
  useEffect(() => {
    if (remaining > 0 && remainingPercent <= dangerThresholdPercent) {
      playSound('tick');
    }
  }, [remaining, remainingPercent, dangerThresholdPercent, playSound]);

  // Color variables selection
  const getColor = () => {
    if (remainingPercent <= dangerThresholdPercent) return 'var(--error)';
    if (remainingPercent <= warningThresholdPercent) return 'var(--warning)';
    return 'var(--success)';
  };

  // SVG Calculations
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (remainingPercent / 100) * circumference;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`
      }}
      className={remainingPercent <= dangerThresholdPercent && remaining > 0 ? 'timer-danger-pulsing' : ''}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--bg-tertiary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease'
          }}
        />
      </svg>
      
      {/* Time Text Overlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: '800',
        color: getColor(),
        fontFamily: 'monospace',
        transition: 'color 0.3s ease'
      }}>
        {formatTime(remaining)}
      </div>

      <style>
        {`
          @keyframes timerPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
          }
          .timer-danger-pulsing {
            animation: timerPulse 1s infinite ease-in-out;
            background: rgba(239, 68, 68, 0.1);
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default Timer;
