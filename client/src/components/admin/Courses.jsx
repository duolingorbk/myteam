import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [showChoices, setShowChoices] = useState({});

  useEffect(() => {
    axios
      .get('http://127.0.01:3000/lesson/All') 
      .then((response) => {
        setLessons(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the lessons!', error);
      });
  }, []);

  const toggleChoices = (id) => {
    setShowChoices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-container">
      {/* Container for lessons */}
      <div className="lessons-container">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="lesson"
            onClick={() => toggleChoices(lesson.id)}
          >
            {lesson.title}
            {showChoices[lesson.id] && (
              <div className="choices">
                <div className="choice">Easy</div>
                <div className="choice">Medium</div>
                <div className="choice">Hard</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
