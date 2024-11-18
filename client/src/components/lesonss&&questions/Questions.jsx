import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Questions.css'

export default function Questions() {
  const { lessonId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lessonIDD, setLessonIDD] = useState(parseInt(lessonId));
  const [progress, setProgress] = useState(0);
  const [resultProgress, setResultProgress] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [lessons, setLessons] = useState([]);

  
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (!location.state?.lessons) {
          const response = await axios.get('http://localhost:3000/lessons');
          setLessons(response.data);
        } else {
          setLessons(location.state.lessons);
        }
      } catch (err) {
        console.log("Error fetching lessons:", err);
        setLessons([]);
      }
    };
    fetchLessons();
  }, [location.state]);


  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/questions/all/${lessonIDD}`);
      setQuestions(res.data);
      console.log('Questions:', res.data);
      setCurrentQuestionIndex(0);
      setProgress(0);
      setResultProgress(0);
      setShowProgress(false);
    } catch (err) {
      console.log("Error fetching questions:", err);
    }
  }

  const fetchAnswers = async (questionId) => {
    try {
      const res = await axios.get(`http://localhost:3000/Answers/all/${questionId}`);
      setAnswers(res.data);
      console.log('Answers for question', questionId, ':', res.data);
    } catch (err) {
      console.log("Error fetching answers:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [lessonIDD]);

  useEffect(() => {
    if (questions.length > 0) {
      fetchAnswers(questions[currentQuestionIndex].id);
    }
  }, [currentQuestionIndex, questions]);

  const incrementQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setLessonCompleted(true);
      setShowProgress(true);
    }
  };

  const progressForLesson = function (answerId) {
    const answer = answers.find(elem => elem.id === answerId);
    if (answer && answer.status === 1) {
      setProgress(prev => prev + 1);
    }
  };

  const handleProgress = function (id) {
    progressForLesson(id);
    percentageProgress();
    incrementQuestion();
  };

  const percentageProgress = function () {
    if (answers.length > 0) {
      const result = (progress / answers.length) * 100;
      setResultProgress(result);
    }
  };

  const handleNextLesson = () => {
    if (lessons.length === 0) {
      console.log("No lessons available.");
      navigate('/lessons');
      return;
    }

    const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonIDD);
    
    if (currentLessonIndex === -1 || currentLessonIndex >= lessons.length - 1) {
      navigate('/lessons');
      return;
    }

 
    const nextLesson = lessons[currentLessonIndex + 1];
    
    
    navigate(`/questions/${nextLesson.id}`, {
      state: { lessons: lessons }
    });


    setLessonIDD(nextLesson.id);
  };

  return (
    <div className='questions-container'>
      {lessonCompleted ? (
        <div>
          <h2>Good Job! You've completed this lesson!</h2>
          <h3>Your Progress: {resultProgress}%</h3>
          <div>
            <button className='bt' onClick={handleNextLesson}>
              Go to Next Lesson
            </button>
            <button className='bt' onClick={() => navigate('/lessons')}>
              Back to Lessons
            </button>
          </div>
        </div>
      ) : (
        <>
          {showProgress && (
            <div className="progress-bar">
              <div className="progress-bar-filled" style={{ width: `${resultProgress}%` }}></div>
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
                    onClick={() => handleProgress(answer.id)}
                  >
                    {answer.content}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div>
              <h2>Loading...</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}
