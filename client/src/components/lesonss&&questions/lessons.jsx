import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lessons.css';

function Lessons({ language }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get lesson progress from local storage
  const getLessonProgress = (lessonId) => {
    return localStorage.getItem(`lesson${lessonId}Progress`) === '100';
  };

  // Unlock lessons sequentially: Lesson 1 is unlocked, then next lessons depend on previous one's progress
  const unlockedLessons = lessons.map((lesson, index) => {
    const isPreviousLessonUnlocked = index === 0 || getLessonProgress(lessons[index].id - 1);

  // Unlock lessons based on progress
  const unlockedLessons = lessons.map((lesson, index) => {
    const isUnlocked = index === 0 || getLessonProgress(lessons[index - 1].id); // Check previous lesson's progress
    return { ...lesson, isUnlocked };
  });

  useEffect(() => {
      try {
        const res = await axios.get(`http://localhost:3000/lesson/all/${language}`);
        setLessons(res.data);
      } catch (err) {
        setError('Failed to fetch lessons');
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [language]);

  const handleLessonClick = (lessonId) => {
    // Simulating lesson completion
    setLessonProgress(lessonId, 100); // Set current lesson progress to 100%
    navigate(`/questions/${lessonId}`);
  };

  const getLanguageEmoji = (language) => {
    switch (language) {
      case 'english':
        return '🇬🇧'; // English flag emoji
      case 'french':
        return '🇫🇷'; // French flag emoji
      default:
        return '🌍'; // Globe emoji for other languages or default
    }
  };

  if (loading) return <p>Loading lessons...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lessons-container">
      <h2>{language.toUpperCase()} Lessons</h2>
      <div className="lesson-cards">
        {unlockedLessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <div className="lesson-card-header">
              <span role="img" aria-label={language}>
                {getLanguageEmoji(language)} {/* Language-specific emoji */}
              </span>
              <h3>{lesson.title} {lesson.isUnlocked ? '' : '(Locked)'}</h3>
            </div>
            <button
              className="btn btn-lesson"
              onClick={() => lesson.isUnlocked && handleLessonClick(lesson.id)}
              disabled={!lesson.isUnlocked}
            >
              {lesson.isUnlocked ? 'Start Lesson' : 'Complete Previous Lesson to Unlock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
