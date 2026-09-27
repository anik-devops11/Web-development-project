import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const MainLayout = () => {
  return (
    <div className="app-container">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden'
      }}>
        {/* Top Header */}
        <Header />

        {/* Viewport content */}
        <main
          className="main-content"
          style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 64px)' // subtract header height
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingBottom: '40px' // spacing at bottom
          }}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default MainLayout;
