import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Questions.css';

export default function Questions() {
  const { lessonId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/questions/all/${lessonId}`);
        setQuestions(res.data);
        setCurrentQuestionIndex(0);
        setCorrectAnswersCount(0);
        setShowProgress(false);
      } catch (err) {
        console.log("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, [lessonId]);

  const fetchAnswers = async (questionId) => {
    try {
      const res = await axios.get(`http://localhost:3000/Answers/all/${questionId}`);
      setAnswers(res.data);
    } catch (err) {
      console.log("Error fetching answers:", err);
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      fetchAnswers(questions[currentQuestionIndex].id);
    }
  }, [currentQuestionIndex, questions]);

  const incrementQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setLessonCompleted(true);
      setShowProgress(true);
    }
  };

  const handleAnswerClick = (answerId) => {
    const answer = answers.find(elem => elem.id === answerId);
    if (answer && answer.status === 1) {
      setCorrectAnswersCount(prevCount => prevCount + 1);
    }
    incrementQuestion();
  };

  const calculateProgress = () => {
    if (correctAnswersCount === 1) return 33.33;
    if (correctAnswersCount === 2) return 66.67;
    if (correctAnswersCount === 3) return 100;
    return 0;
  };

  useEffect(() => {
    const progress = calculateProgress();
    localStorage.setItem(`lesson${lessonId}Progress`, progress);
  }, [correctAnswersCount, lessonId]);

  const handleNextLesson = () => {
    navigate(`/lessons`);
  };

  return (
    <div className='questions-container'>
      {lessonCompleted ? (
        correctAnswersCount === 3 ? (
          <>
            <h2>Good Job! You've completed this lesson!</h2>
            <h3>Your Progress: {calculateProgress()}%</h3>
            <button className='gotonext' onClick={handleNextLesson}>
              Go to Next Lesson
            </button>
          </>
        ) : (
          <>
            <h2>Sorry! You failed this lesson!</h2>
            <h3>Your Progress: {calculateProgress()}%</h3>
            <button className='backtolesson' onClick={() => navigate('/lessons')}>
              Back to Lessons
            </button>
          </>
        )
      ) : (
        <>
          {showProgress && (
            <div className="progress-bar">
              <div className="progress-bar-filled" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          )}
          {questions.length ? (
            <>
              <h2 className='question-number-render'>
                Question {currentQuestionIndex + 1}
              </h2>
              <h3 className='question-render'>{questions[currentQuestionIndex].content}</h3>
              <div className="answers-container">
                {answers.map((answer, index) => (
                  <button
                    className="answer-item"
                    key={index}
                    onClick={() => handleAnswerClick(answer.id)}
                  >
                    {answer.content}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </>
      )}
    </div>
  );
  
}
