import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { QuizProvider } from './context/QuizContext';
import { ToastProvider } from './context/ToastContext';

// Core Layout
import MainLayout from './components/layout/MainLayout';
import Spinner from './components/common/Spinner';

// Pages - Lazy loaded for performance splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const QuizDetailsPage = lazy(() => import('./pages/QuizDetailsPage'));
const QuizAttemptPage = lazy(() => import('./pages/QuizAttemptPage'));
const QuizResultPage = lazy(() => import('./pages/QuizResultPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

// Loading Screen Fallback Component
const LoadingScreen = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-secondary)',
    gap: '16px'
  }}>
    <Spinner size="lg" color="primary" />
    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600', letterSpacing: '1px' }}>
      LOADING QUIZIFY...
    </span>
  </div>
);

// Static About Page Component
const AboutPage = () => (
  <div className="card-glass animate-slide-in" style={{ padding: '40px', lineHeight: '1.6' }}>
    <Helmet>
      <title>About Us | Quizify</title>
    </Helmet>
    <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-primary)', marginBottom: '16px' }}>
      About Quizify ⚡
    </h2>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
      Quizify is a state-of-the-art interactive gaming trivia app created to test cognitive memory, retention speeds, and conceptual mastery.
      Inspired by best-in-class educational models, we prioritize micro-interactions, responsive sizing, and fluid progress mechanics.
    </p>
    <h4 style={{ color: 'var(--text-primary)', margin: '24px 0 12px 0' }}>Core Architecture Features:</h4>
    <ul style={{ color: 'var(--text-secondary)', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <li><strong>Session Resiliency</strong>: Auto-save engine ensures active progress remains safe during crashes or page refreshes.</li>
      <li><strong>Browser Synth Audio</strong>: Audio synthesizers powered fully by the HTML Web Audio API.</li>
      <li><strong>Outlets Routing</strong>: Nested viewports, layout frames, and protected route groups powered by React Router v6.</li>
      <li><strong>Tailored Styling Rules</strong>: Fully responsive vanilla custom variables for seamless theme toggling.</li>
    </ul>
  </div>
);

// Static Contact Page Component
const ContactPage = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="card-glass animate-slide-in" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <Helmet>
        <title>Contact Feedback | Quizify</title>
      </Helmet>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-primary)', marginBottom: '12px' }}>
        Send Us Feedback ✉️
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: 'var(--font-size-sm)' }}>
        Have questions or bug reports? We would love to hear from you.
      </p>

      {submitted ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <span style={{ fontSize: '48px' }}>🎉</span>
          <h4 style={{ color: 'var(--success)', marginTop: '16px', marginBottom: '8px' }}>Feedback Received!</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            Thank you for helping us make Quizify better. We will get back to you soon.
          </p>
          <Button variant="secondary" onClick={() => setSubmitted(false)} style={{ marginTop: '16px' }}>
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: 'var(--font-size-sm)' }}>Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: 'var(--font-size-sm)' }}>Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: 'var(--font-size-sm)' }}>Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)',
                resize: 'none'
              }}
            />
          </div>
          <Button type="submit" variant="primary">Submit Feedback</Button>
        </form>
      )}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <UserProvider>
          <QuizProvider>
            <ToastProvider>
              <BrowserRouter>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Main Layout Protected Routes */}
                    <Route element={<MainLayout />}>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/quiz/:id" element={<QuizDetailsPage />} />
                      <Route path="/leaderboard" element={<LeaderboardPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                    </Route>

                    {/* Fullscreen focused attempt flows */}
                    <Route path="/quiz/:id/attempt" element={<QuizAttemptPage />} />
                    <Route path="/quiz/:id/result" element={<QuizResultPage />} />

                    {/* Redirect Catch-All */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </ToastProvider>
          </QuizProvider>
        </UserProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
