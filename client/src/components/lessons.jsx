import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../src/App.css'
function Lessons({ language }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/lesson/all?language=${language}`);
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

  if (loading) return <p>Loading lessons...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{language.toUpperCase()} Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id} onClick={() => handleLessonClick(lesson.id)}>
            {lesson.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lessons;
