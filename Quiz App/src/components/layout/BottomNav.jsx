import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, Trophy, Settings } from 'lucide-react';

const BottomNav = () => {
  const menuItems = [
    { name: 'Home', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Explore', path: '/categories', icon: <Compass size={20} /> },
    { name: 'Rank', path: '/leaderboard', icon: <Trophy size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> }
  ];

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-glass)',
        display: 'none', // controlled by media queries
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '64px',
        paddingBottom: 'safe-area-inset-bottom', // iOS safety
        zIndex: 999,
        boxShadow: '0 -5px 15px rgba(0,0,0,0.1)'
      }}
    >
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: isActive ? '700' : '500',
            flex: 1,
            height: '100%',
            transition: 'color 0.2s'
          })}
        >
          {({ isActive }) => (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 16px',
                borderRadius: '16px',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                transition: 'background-color 0.2s'
              }}>
                {item.icon}
              </div>
              <span>{item.name}</span>
            </>
          )}
        </NavLink>
      ))}

      <style>
        {`
          @media (max-width: 1024px) {
            .mobile-bottom-nav {
              display: flex !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default BottomNav;
