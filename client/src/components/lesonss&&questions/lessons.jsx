import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lessons.css'; // Updated CSS file for lessons

function Lessons({ language }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch and check lesson progress for all lessons dynamically
  const getLessonProgress = (lessonId) => {
    return localStorage.getItem(`lesson${lessonId}Progress`) === '100';
  };

  // Unlock lessons sequentially: Lesson 1 is unlocked, then next lessons depend on previous one's progress
  const unlockedLessons = lessons.map((lesson, index) => {
    const isPreviousLessonUnlocked = index === 0 || getLessonProgress(lessons[index].id - 1);
    return { ...lesson, isUnlocked: isPreviousLessonUnlocked };
  });

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
        return '🇬🇧'; // English flag emoji
      case 'french':
        return '🇫🇷'; // French flag emoji
      default:
        return '🌍'; // Globe emoji for other languages or default
    }
  };

  const getEmojiForLesson = (lesson) => {
    return getLanguageEmoji(language); // Emoji for the language of the lesson
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
                {getEmojiForLesson(lesson)} {/* Language-specific emoji */}
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
