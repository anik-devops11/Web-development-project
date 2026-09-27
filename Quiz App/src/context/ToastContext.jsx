import React, { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto dismiss after 3500ms
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      
      {/* Global Toast Container */}
      <div
        className="toast-container"
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 10000,
          pointerEvents: 'none',
          maxWidth: '350px',
          width: 'calc(100% - 48px)'
        }}
      >
        {toasts.map(toast => {
          const getColors = () => {
            switch (toast.type) {
              case 'error':
                return { bg: 'var(--error-light)', border: 'var(--error)', icon: '❌' };
              case 'warning':
                return { bg: 'var(--warning-light)', border: 'var(--warning)', icon: '⚠️' };
              case 'info':
                return { bg: 'var(--primary-light)', border: 'var(--primary)', icon: 'ℹ️' };
              default:
                return { bg: 'var(--success-light)', border: 'var(--success)', icon: '✅' };
            }
          };

          const colors = getColors();

          return (
            <div
              key={toast.id}
              onClick={() => removeToast(toast.id)}
              style={{
                pointerEvents: 'auto',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: `5px solid ${colors.border}`,
                boxShadow: 'var(--shadow-md)',
                animation: 'slideInRight 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <span style={{ fontSize: '18px' }}>{colors.icon}</span>
              <span style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                flex: 1
              }}>
                {toast.message}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeToast(toast.id);
                }}
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '16px',
                  lineHeight: 1,
                  padding: '2px',
                  marginLeft: '8px'
                }}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          @media (max-width: 600px) {
            .toast-container {
              top: auto;
              bottom: 24px;
              right: 12px;
              left: 12px;
              max-width: none;
              width: calc(100% - 24px);
            }
          }
        `}
      </style>
    </ToastContext.Provider>
  );
};
export default ToastProvider;
