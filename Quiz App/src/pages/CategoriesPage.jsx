import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Award, PlayCircle, Filter } from 'lucide-react';
import { MOCK_QUIZZES, MOCK_CATEGORIES } from '../services/mockData';
import Button from '../components/common/Button';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All'); // 'All', 'Easy', 'Medium', 'Hard'
  const [selectedCategory, setSelectedCategory] = useState('All'); // 'All', 'programming', 'web-design', 'science', 'history'

  const quizzesList = useMemo(() => {
    return Object.values(MOCK_QUIZZES);
  }, []);

  // Filter & Search Logic
  const filteredQuizzes = useMemo(() => {
    return quizzesList.filter(quiz => {
      // 1. Category search matches
      const categoryMatch = selectedCategory === 'All' || quiz.categoryId === selectedCategory;
      
      // 2. Difficulty search matches
      const difficultyMatch = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;
      
      // 3. Search query matches title or description
      const query = searchQuery.toLowerCase().trim();
      const textMatch = !query || 
        quiz.title.toLowerCase().includes(query) || 
        quiz.description.toLowerCase().includes(query);

      return categoryMatch && difficultyMatch && textMatch;
    });
  }, [quizzesList, selectedCategory, selectedDifficulty, searchQuery]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'var(--success)';
      case 'Medium':
        return 'var(--warning)';
      case 'Hard':
        return 'var(--error)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getCategoryColor = (catId) => {
    const cat = MOCK_CATEGORIES.find(c => c.id === catId);
    return cat ? cat.color : 'var(--primary)';
  };

  const getCategoryName = (catId) => {
    const cat = MOCK_CATEGORIES.find(c => c.id === catId);
    return cat ? cat.name : 'General';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-slide-in">
      
      {/* Page Title */}
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--text-primary)', marginBottom: '6px' }}>
          Explore Quiz Collections
        </h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 'var(--font-size-base)' }}>
          Search for coding tests, science challenges, UI layout structures, and world trivia.
        </p>
      </div>

      {/* Control Console (Search + Filters Grid) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glass)'
      }}>
        {/* Search Field */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none'
          }} size={20} />
          <input
            type="text"
            placeholder="Search quizzes by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              fontWeight: '500',
              fontSize: 'var(--font-size-base)',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-glass)'}
          />
        </div>

        {/* Filter Pills Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Category Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => setSelectedCategory('All')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-round)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: selectedCategory === 'All' ? 'var(--primary)' : 'var(--bg-primary)',
                color: selectedCategory === 'All' ? 'white' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === 'All' ? 'var(--primary)' : 'var(--border-glass)'}`,
                transition: 'all 0.2s'
              }}
            >
              All Categories
            </button>
            {MOCK_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-round)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === cat.id ? cat.color : 'var(--bg-primary)',
                  color: selectedCategory === cat.id ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${selectedCategory === cat.id ? cat.color : 'var(--border-glass)'}`,
                  transition: 'all 0.2s'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Difficulty Filters */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: '700', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={12} /> DIFFICULTY:
            </span>
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  backgroundColor: selectedDifficulty === diff ? 'var(--text-primary)' : 'var(--bg-primary)',
                  color: selectedDifficulty === diff ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${selectedDifficulty === diff ? 'var(--text-primary)' : 'var(--border-glass)'}`,
                  transition: 'all 0.2s'
                }}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quizzes Layout Grid */}
      {filteredQuizzes.length === 0 ? (
        <div
          className="card-glass"
          style={{
            padding: '60px 40px',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <span style={{ fontSize: '50px' }}>🔍</span>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>No Quizzes Found</h3>
          <p style={{ margin: 0, maxWidth: '400px', fontSize: 'var(--font-size-sm)' }}>
            We couldn't find any quizzes matching your search or filters. Try adjusting your settings.
          </p>
          <Button size="sm" onClick={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSelectedDifficulty('All');
          }}>Reset Filters</Button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredQuizzes.map(quiz => (
            <div
              key={quiz.id}
              className="card-glass hoverable"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between'
              }}
            >
              {/* Card Top Details */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  {/* Category Tag */}
                  <span style={{
                    backgroundColor: `${getCategoryColor(quiz.categoryId)}20`,
                    color: getCategoryColor(quiz.categoryId),
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '800',
                    textTransform: 'uppercase'
                  }}>
                    {getCategoryName(quiz.categoryId)}
                  </span>
                  
                  {/* Difficulty Tag */}
                  <span style={{
                    color: getDifficultyColor(quiz.difficulty),
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: '800'
                  }}>
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'var(--font-size-lg)',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  {quiz.title}
                </h3>
                
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--font-size-sm)',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}>
                  {quiz.description}
                </p>
              </div>

              {/* Card Bottom Meta Data */}
              <div style={{
                borderTop: '1px solid var(--border-glass)',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '16px', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {quiz.durationMinutes}m
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={14} /> {quiz.points} Pts
                  </span>
                </div>

                <Button
                  size="sm"
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  icon={<PlayCircle size={14} />}
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
