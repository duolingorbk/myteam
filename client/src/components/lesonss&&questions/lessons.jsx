import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../lesonss&&questions/Lessons.css';

function Lessons({ language }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getLessonProgress = (lessonId) => {
    return localStorage.getItem(`lesson${lessonId}Progress`) === '100';
  };

  useEffect(() => {
    const fetchLessons = async () => {
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
    navigate(`/questions/${lessonId}`);
  };
  const getLanguageEmoji = (language) => {
    switch (language) {
      case 'english':
        return '🇺🇸'; // USA flag for English
      case 'french':
        return '🇫🇷'; // France flag for French
      default:
        return '🌍';  // Default world flag if the language is not recognized
    }
  }

  if (loading) return <p>Loading lessons...</p>;

  return (
    <div className="lessons-container">
      <h2>{language.toUpperCase()} Lessons</h2>
      <div className="lesson-cards">
        {lessons.map((lesson, index) => {
          const isUnlocked = index === 0 || getLessonProgress(lessons[index - 1].id);
          return (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-card-header">
                <span role="img" aria-label={language}>
                  {getLanguageEmoji(language)}
                </span>
                <h3>{lesson.title}</h3>
              </div>
              <button
                className="btn btn-lesson"
                onClick={() => handleLessonClick(lesson.id)}
                disabled={!isUnlocked}
              >
                {isUnlocked ? 'Start Lesson' : 'Complete Previous Lesson to Unlock'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Lessons;
