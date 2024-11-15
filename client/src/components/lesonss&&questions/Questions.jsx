// Questions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Questions.css';

function Questions() {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastLessonId, setLastLessonId] = useState(null); // To store the ID of the final lesson
  const [language, setLanguage] = useState(null); // To store the language of the lesson
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/questions/all/${lessonId}`);
        setQuestions(res.data);
      } catch (err) {
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    const fetchLessonDetails = async () => {
      try {
        const lessonRes = await axios.get(`http://localhost:3000/lessons/${lessonId}`);
        setLanguage(lessonRes.data.language); // Assuming the lesson contains a 'language' field
      } catch (err) {
        console.error('Failed to fetch lesson details');
      }
    };

    const fetchLastLessonId = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/lessons/last`); // Endpoint to get the last lesson ID
        setLastLessonId(res.data.id);
      } catch (err) {
        console.error('Failed to fetch the last lesson ID');
      }
    };

    fetchQuestions();
    fetchLessonDetails();
    fetchLastLessonId();
  }, [lessonId]);

  const handleAnswerClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to the next question within the same lesson
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If it's the last question of the last lesson
      if (parseInt(lessonId, 10) === lastLessonId && currentQuestionIndex === questions.length - 1) {
        console.log('Navigating to the lessons page for language:', language); // Debugging step
        // Navigate to the lessons page for the current language
        navigate(`/lessons/${language}`);
      } else {
        // Otherwise, navigate to the next lesson
        navigate(`/questions/${parseInt(lessonId, 10) + 1}`);
      }
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="questions-container">
      <h2 className="questions-title">Questions for Lesson {lessonId}</h2>
      <div className="question-item">
        <p>{currentQuestion.content}</p>
        <ul className="answers-list">
          {currentQuestion.Answers && currentQuestion.Answers.map((answer) => (
            <li 
              key={answer.id} 
              className="answer-item" 
              onClick={handleAnswerClick} // Move to the next question or lesson on answer click
            >
              {answer.content}
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ width: '100%', height: '100%', paddingBottom: '100%', position: 'relative' }}>
  <iframe  style={{ width: '100%',
    height: '100%',
    position: 'absolute',
    border: 'none'}}
    src="https://giphy.com/embed/GR4U8hwGbFIIjpFA0m" 
    width="100%" 
    height="100%" 
    
    frameBorder="0" 
    className="giphy-embed" 
   
 />
</div>
</div>
    
  );
}

export default Questions;
