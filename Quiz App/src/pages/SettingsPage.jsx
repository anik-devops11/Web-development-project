import React, { useContext, useState } from 'react';
import { Settings, Save, Trash2, Volume2, User, HelpCircle } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { ToastContext } from '../context/ToastContext';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const SettingsPage = () => {
  const {
    username,
    avatar,
    soundEnabled,
    volume,
    updateProfile,
    toggleSound,
    setVolume,
    resetData
  } = useContext(UserContext);

  const { addToast } = useContext(ToastContext);

  const [tempName, setTempName] = useState(username);
  const [selectedEmoji, setSelectedEmoji] = useState(avatar);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const emojis = ['🧠', '🧙‍♂️', '🥷', '🧑‍🚀', '👸', '🦖', '🦁', '🦄', '👽', '🤖', '🦊', '🦉'];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const cleanName = tempName.trim();
    if (!cleanName) {
      addToast('Username cannot be empty!', 'error');
      return;
    }
    updateProfile(cleanName, selectedEmoji);
    addToast('Profile settings saved successfully!', 'success');
  };

  const handleResetWipe = () => {
    resetData();
    setTempName('Guest Explorer');
    setSelectedEmoji('🧠');
    setResetConfirmOpen(false);
    addToast('All local statistics and highscores have been cleared.', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-slide-in">
      
      {/* Page Title */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={28} />
          <span>System Settings</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--font-size-base)' }}>
          Manage your gamified account variables, sound feedback volume, and local database cache.
        </p>
      </div>

      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        
        {/* Left Card: Edit Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card-glass" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={20} color="var(--primary)" />
              <span>Personal Profile Settings</span>
            </h3>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  Challenger Username
                </label>
                <input
                  type="text"
                  maxLength={15}
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    fontSize: 'var(--font-size-base)',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-glass)'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  Avatar Badge Symbol
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '10px',
                  padding: '14px',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-glass)'
                }}>
                  {emojis.map(e => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setSelectedEmoji(e)}
                      style={{
                        fontSize: '28px',
                        padding: '6px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        backgroundColor: selectedEmoji === e ? 'var(--primary-light)' : 'transparent',
                        border: selectedEmoji === e ? '1px solid var(--primary)' : '1px solid transparent',
                        transition: 'all 0.1s'
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                icon={<Save size={16} />}
                style={{ alignSelf: 'flex-start' }}
              >
                Save Settings
              </Button>
            </form>
          </div>
        </div>

        {/* Right Side: Sound Controls & Reset */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Sounds Settings */}
          <div className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Volume2 size={20} color="var(--primary)" />
              <span>Audio Controls</span>
            </h3>

            {/* Sound Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h5 style={{ margin: 0, color: 'var(--text-primary)', fontWeight: '700' }}>Sound Effects</h5>
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Synthesize correct / fail answer audio triggers.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleSound}
                style={{
                  width: '50px',
                  height: '26px',
                  borderRadius: '13px',
                  backgroundColor: soundEnabled ? 'var(--success)' : 'var(--bg-tertiary)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '3px',
                  left: soundEnabled ? '27px' : '3px',
                  transition: 'left 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }} />
              </button>
            </div>

            {/* Volume slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', fontWeight: '600' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Master Volume</span>
                <span style={{ color: 'var(--text-primary)' }}>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                disabled={!soundEnabled}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--primary)',
                  cursor: soundEnabled ? 'pointer' : 'not-allowed',
                  opacity: soundEnabled ? 1 : 0.5
                }}
              />
            </div>
          </div>

          {/* Database Actions */}
          <div className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', margin: 0 }}>
              Database Actions
            </h3>
            
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Wipe score achievements, streak history log, profile customizations, and restore mock defaults.
            </p>

            <Button
              variant="danger"
              icon={<Trash2 size={16} />}
              onClick={() => setResetConfirmOpen(true)}
              style={{ width: '100%' }}
            >
              Reset All Profile Data
            </Button>
          </div>
        </div>

      </div>

      {/* Database Reset Warn Modal */}
      <Modal
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title="Are you absolutely sure? ⚠️"
        size="sm"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, lineHeight: '1.5' }}>
            This action is irreversible. All completed quizzes history, streak counts, XP points, and unlocked badges will be deleted from your browser's local cache.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button variant="secondary" onClick={() => setResetConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleResetWipe}>
              Yes, Reset Everything
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SettingsPage;
