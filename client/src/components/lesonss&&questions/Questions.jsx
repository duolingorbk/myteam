import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function Questions() {
  const { lessonId } = useParams();
  const location = useLocation();
  const { lessons } = location.state || []; // Retrieve lessons from location state

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lessonIDD, setLessonIDD] = useState(parseInt(lessonId)); // Using lessonId from URL
  const [progress, setProgress] = useState(0);
  const [resultProgress, setResultProgress] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Fetch questions for the lesson based on lessonId
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/questions/all/${lessonIDD}`);
      setQuestions(res.data);
      console.log('Questions:', res.data);
      setCurrentQuestionIndex(0);
      setProgress(0);
      setResultProgress(0);
      setLessonCompleted(false);
      setShowProgress(false);
    } catch (err) {
      console.log("Error fetching questions:", err);
    }
  };

  // Fetch answers for the current question based on questionId
  const fetchAnswers = async (questionId) => {
    try {
      const res = await axios.get(`http://localhost:3000/Answers/all/${questionId}`);
      setAnswers(res.data);
      console.log('Answers for question', questionId, ':', res.data);
    } catch (err) {
      console.log("Error fetching answers:", err);
    }
  };

  // Fetch questions initially when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, [lessonIDD]);

  // Fetch answers whenever the current question index changes
  useEffect(() => {
    if (questions.length > 0) {
      fetchAnswers(questions[currentQuestionIndex].id);
    }
  }, [currentQuestionIndex, questions]);

  // Handle incrementing to the next question
  const incrementQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setLessonCompleted(true);
      setShowProgress(true);
    }
  };

  // Progress calculation
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

  // Handle toggling to the next lesson
  const handleNextLesson = () => {
    const currentLessonIndex = lessons.findIndex(lesson => lesson.id === lessonIDD);
    if (currentLessonIndex < lessons.length - 1) {
      const nextLessonId = lessons[currentLessonIndex + 1].id;
      setLessonIDD(nextLessonId);
    } else {
      console.log("No more lessons available.");
      navigate('/lessons');
    }
  };

  // Render the current question and its answers
  return (
    <div className='questions-container'>
      {lessonCompleted ? (
        <div>
          <h2>Good Job! You've completed this lesson!</h2>
          <h3>Your Progress: {resultProgress}%</h3>
          <div>
            <button onClick={handleNextLesson}>
              Go to Next Lesson
            </button>
            <button onClick={() => navigate('/lessons')}>
              Back to Lessons
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2>Questions for Lesson {lessonIDD}</h2>

          {showProgress && (
            <div className="progress-bar">
              <div className="progress-bar-filled" style={{ width: `${resultProgress}%` }}></div>
            </div>
          )}

          {questions.length ? (
            <>
              <h1 className='question-number-render'>
                Question {currentQuestionIndex + 1}
              </h1>
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
