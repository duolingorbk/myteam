import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../admin/css/Lessons.css";

const Languages = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showFrench, setShowFrench] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/lesson/allLessons')
      .then((res) => {
        setLessons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleDropdown = (language) => {
    if (language === 'english') {
      setShowEnglish(!showEnglish);
    } else if (language === 'french') {
      setShowFrench(!showFrench);
    }
  };

  return (
    <div className="lessonsInterface">
      <button className='newLesson' onClick={() => navigate("/createLesson")}>Add New Lesson</button>
      <div className="language-Box">
        <h2>Languages</h2>
        <div className="language-buttons">
          <div className="language-container">
            <button
              className="english"
              onClick={() => toggleDropdown('english')}
            >
              English
            </button>
            {showEnglish && (
              <div className="dropdown" id="english-dropdown">
                {lessons.filter((lesson) => lesson.language === 'english').map((lesson) => (
                  <div key={lesson.id}
                    className="lesson-choice"
                    onClick={() => navigate(`/adminquestions/${lesson.id}`)}
                  >
                    {lesson.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="language-container">
            <button
              className="french"
              onClick={() => toggleDropdown('french')}
            >
              French
            </button>
            {showFrench && (
              <div className="dropdown" id="french-dropdown">
                {lessons.filter(lesson => lesson.language === 'french').map((lesson) => (
                  <div key={lesson.id}
                    className="lesson-choice"
                    onClick={() => navigate(`/adminquestions/${lesson.id}`)}
                  >
                    {lesson.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Languages;