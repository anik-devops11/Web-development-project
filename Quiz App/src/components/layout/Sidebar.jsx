import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, Trophy, Settings, Sun, Moon, HelpCircle } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { username, avatar, level } = useContext(UserContext);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Categories', path: '/categories', icon: <Compass size={20} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> }
  ];

  return (
    <aside
      className="sidebar-nav"
      style={{
        width: '260px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Brand Logo */}
      <div style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid var(--border-glass)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, #8B5CF6 100%)',
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '800',
          fontSize: '22px',
          boxShadow: 'var(--shadow-glow)'
        }}>
          ⚡
        </div>
        <span style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: '800',
          background: 'linear-gradient(90deg, var(--primary) 0%, #8B5CF6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Quizify
        </span>
      </div>

      {/* Navigation Menu */}
      <nav style={{
        flex: 1,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
              fontWeight: isActive ? '700' : '500',
              transition: 'all 0.2s ease-in-out'
            })}
            className="sidebar-link-item"
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Quick Info */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Profile Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '28px' }}>{avatar}</span>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontWeight: '700',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-primary)',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}>
              {username}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--primary)', fontWeight: '600' }}>
              Level {level}
            </div>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '10px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            fontWeight: '600',
            fontSize: 'var(--font-size-xs)',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={16} color="var(--warning)" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={16} color="var(--primary)" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      <style>
        {`
          .sidebar-link-item:hover {
            background-color: var(--bg-tertiary);
            color: var(--text-primary);
            transform: translateX(4px);
          }
          @media (max-width: 1024px) {
            .sidebar-nav {
              display: none !important;
            }
          }
        `}
      </style>
    </aside>
  );
};

export default Sidebar;
