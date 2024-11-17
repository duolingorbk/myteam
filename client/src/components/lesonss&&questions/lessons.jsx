import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lessons.css';

function Lessons({ language }) {
  const [lessons, setLessons] = useState({ easy: [], medium: [], hard: [] }); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch lessons categorized by language
    axios.get(`http://localhost:3000/lesson/all/${language}`)
      .then(res => {
        const lessonData = res.data;
        const categorizedLessons = { easy: [], medium: [], hard: [] };
        lessonData.forEach(lesson => {
          if (categorizedLessons[lesson.level]) {
            categorizedLessons[lesson.level].push(lesson);
          }
        });
        setLessons(categorizedLessons);
      })
      .catch(err => {
        setError('Failed to fetch lessons');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [language]);

  // Handle navigating to the questions for a specific lesson
  const handleLessonClick = (lessonId, level) => {
    navigate(`/questions/${lessonId}?level=${level}`);
  };

  if (loading) return <p>Loading lessons...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lessons-container">
      <h2>{language.toUpperCase()} Lessons</h2>
      {/* Display lessons for each level */}
      {['easy', 'medium', 'hard'].map(level => (
        <div key={level} className={`${level}-lessons`}>
          <h3>{level.charAt(0).toUpperCase() + level.slice(1)} Level</h3>
          <ul className="lesson-list">
            {lessons[level].map(lesson => (
              <li key={lesson.id} className="lesson-item">
                <button 
                  className="button button-border button-base" 
                  onClick={() => handleLessonClick(lesson.id, level)}  // Pass the lessonId and level
                >
                  {lesson.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Lessons;
