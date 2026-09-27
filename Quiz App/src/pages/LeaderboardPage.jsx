import React, { useContext, useMemo } from 'react';
import { Trophy, Medal, Star, Shield } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { MOCK_LEADERBOARD } from '../services/mockData';

const LeaderboardPage = () => {
  const { username, avatar, xp, unlockedBadges } = useContext(UserContext);

  // Combine active user stats into leaderboard for real-time ranking climb
  const rankedUsers = useMemo(() => {
    // Check if user already exists in mock list to avoid duplication
    const mockFiltered = MOCK_LEADERBOARD.filter(u => u.username !== username);
    
    const combined = [
      ...mockFiltered,
      {
        username,
        xp,
        avatar,
        badges: unlockedBadges.length,
        active: true // flags to highlight current user
      }
    ];

    // Sort descending by XP points
    return combined
      .sort((a, b) => b.xp - a.xp)
      .map((user, idx) => ({
        ...user,
        rank: idx + 1
      }));
  }, [username, avatar, xp, unlockedBadges]);

  // Extract top 3 and list of rest
  const top3 = useMemo(() => {
    const gold = rankedUsers.find(u => u.rank === 1);
    const silver = rankedUsers.find(u => u.rank === 2);
    const bronze = rankedUsers.find(u => u.rank === 3);
    return { gold, silver, bronze };
  }, [rankedUsers]);

  const remainingRanked = useMemo(() => {
    return rankedUsers.filter(u => u.rank > 3);
  }, [rankedUsers]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-slide-in">
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Trophy size={28} color="var(--accent-gold)" />
          <span>Global Leaderboard</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--font-size-base)' }}>
          Climb the ranks by answering questions accurately and securing multipliers.
        </p>
      </div>

      {/* Podium Render Layout */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: '12px',
        padding: '40px 0 20px 0',
        minHeight: '260px',
        borderBottom: '1px solid var(--border-glass)'
      }} className="leaderboard-podium">
        
        {/* 2nd Place: Silver (Left) */}
        {top3.silver && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '120px'
          }}>
            <span style={{ fontSize: '36px', marginBottom: '8px' }}>{top3.silver.avatar}</span>
            <div style={{
              fontWeight: '700',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-primary)',
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {top3.silver.username}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '8px' }}>
              {top3.silver.xp} XP
            </div>
            
            {/* Podium Box */}
            <div style={{
              width: '100%',
              height: '100px',
              background: 'linear-gradient(185deg, #94A3B8 0%, #475569 100%)',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'rgba(255,255,255,0.7)' }}>2</span>
              <Medal size={16} color="rgba(255,255,255,0.7)" />
            </div>
          </div>
        )}

        {/* 1st Place: Gold (Center) */}
        {top3.gold && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '140px',
            transform: 'translateY(-10px)'
          }}>
            {/* Crown Indicator */}
            <span style={{ fontSize: '22px', lineHeight: 1, animation: 'crownFloat 1s infinite alternate' }}>👑</span>
            <span style={{ fontSize: '48px', marginBottom: '8px' }}>{top3.gold.avatar}</span>
            
            <div style={{
              fontWeight: '800',
              fontSize: 'var(--font-size-base)',
              color: 'var(--text-primary)',
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {top3.gold.username}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--accent-gold)', fontWeight: '700', marginBottom: '8px' }}>
              {top3.gold.xp} XP
            </div>
            
            {/* Podium Box */}
            <div style={{
              width: '100%',
              height: '130px',
              background: 'linear-gradient(185deg, #FBBF24 0%, #D97706 100%)',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)'
            }}>
              <span style={{ fontSize: '32px', fontWeight: '900', color: 'rgba(255,255,255,0.9)' }}>1</span>
              <Trophy size={20} color="rgba(255,255,255,0.9)" />
            </div>
          </div>
        )}

        {/* 3rd Place: Bronze (Right) */}
        {top3.bronze && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '120px'
          }}>
            <span style={{ fontSize: '36px', marginBottom: '8px' }}>{top3.bronze.avatar}</span>
            <div style={{
              fontWeight: '700',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-primary)',
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {top3.bronze.username}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '8px' }}>
              {top3.bronze.xp} XP
            </div>
            
            {/* Podium Box */}
            <div style={{
              width: '100%',
              height: '80px',
              background: 'linear-gradient(185deg, #D97706 0%, #78350F 100%)',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '20px', fontWeight: '800', color: 'rgba(255,255,255,0.6)' }}>3</span>
              <Medal size={16} color="rgba(255,255,255,0.6)" />
            </div>
          </div>
        )}
      </div>

      {/* Rankings List Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', margin: 0 }}>
          Rankings
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxHeight: '400px',
          overflowY: 'auto',
          paddingRight: '4px'
        }}>
          {remainingRanked.map((user) => (
            <div
              key={user.username}
              className="card-glass"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 20px',
                border: user.active ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                backgroundColor: user.active ? 'var(--primary-light)' : 'var(--bg-secondary)',
                boxShadow: user.active ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
              }}
            >
              {/* Left Profile Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Rank Number */}
                <span style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '800',
                  color: user.active ? 'var(--primary)' : 'var(--text-secondary)',
                  width: '24px'
                }}>
                  #{user.rank}
                </span>

                {/* Avatar and Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{user.avatar}</span>
                  <span style={{
                    fontWeight: user.active ? '800' : '600',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-size-sm)'
                  }}>
                    {user.username} {user.active && <span style={{ fontSize: '9px', backgroundColor: 'var(--primary)', color: 'white', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>YOU</span>}
                  </span>
                </div>
              </div>

              {/* Right Stats Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Badges count */}
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--text-secondary)',
                  fontWeight: '600'
                }}>
                  <Shield size={12} color="var(--primary)" /> {user.badges} Badges
                </span>

                {/* XP Count */}
                <span style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '800',
                  color: 'var(--text-primary)'
                }}>
                  {user.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes crownFloat {
            0% { transform: translateY(0px) rotate(-5deg); }
            100% { transform: translateY(-4px) rotate(5deg); }
          }
          @media (max-width: 600px) {
            .leaderboard-podium {
              align-items: center !important;
              flex-direction: column !important;
              gap: 24px !important;
            }
            .leaderboard-podium div {
              width: 100% !important;
              max-width: 250px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LeaderboardPage;
