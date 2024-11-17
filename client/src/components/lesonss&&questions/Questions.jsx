import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Questions.css';

function Questions() {
  const { lessonId } = useParams(); // Get the lessonId from the URL
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [counter, setCounter] = useState(0);
  const [points, setPoints] = useState(0);
  const [isComplete, setIsComplete] = useState(false); // Track if the lesson is complete
  const [showButtons, setShowButtons] = useState(false); // Control button visibility

  // Fetch questions and answers when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionRes = await axios.get(`http://localhost:3000/questions/all/${lessonId}`);
        setQuestions(questionRes.data);

        if (questionRes.data.length > 0) {
          fetchAnswers(questionRes.data[0].id); // Fetch answers for the first question
        }
      } catch (err) {
        console.error('Failed to fetch questions', err);
      }
    };

    const fetchAnswers = async (questionId) => {
      try {
        const answerRes = await axios.get(`http://localhost:3000/Answers/all/${questionId}`);
        setAnswers(answerRes.data);
      } catch (err) {
        console.error('Failed to fetch answers', err);
      }
    };

    fetchQuestions();
  }, [lessonId]); // Refetch questions when lessonId changes

  const handleAnswerClick = (answerId, status) => {
    if (status === 'incorrect') {
      // Handle incorrect answer logic if needed
    } else {
      setPoints(points + 1); // Increase points for correct answers
    }

    if (counter < questions.length - 1) {
      setCounter(counter + 1); // Move to the next question
      fetchAnswers(questions[counter + 1].id); // Fetch next question's answers
    } else {
      handleLessonCompletion(); // If all questions are answered, complete the lesson
    }
  };

  const handleLessonCompletion = () => {
    setIsComplete(true); // Mark the lesson as complete
    setShowButtons(true); // Show the buttons after completing the lesson
  };

  const handleNextLesson = () => {
    const nextLessonId = parseInt(lessonId) + 1; // Get the next lesson ID
    navigate(`/questions/${nextLessonId}`); // Navigate to the next lesson
  };

  const handleCancel = () => {
    navigate('/lessons'); // Navigate back to the lessons page
  };

  const currentQuestion = questions[counter];

  return (
    <div className="questions-container">
      <h2>Lesson {lessonId} Questions</h2>

      {/* Show current question and answers */}
      {!isComplete && currentQuestion && (
        <div className="question-item">
          <h3>{currentQuestion.content}</h3>
          <div className="answers-container">
            <ul className="answers-list">
              {answers.map((answer) => (
                <li
                  key={answer.id}
                  className="answer-item"
                  onClick={() => handleAnswerClick(answer.id, answer.status)} // Track answer click
                >
                  {answer.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Show completion message and buttons after completing the lesson */}
      {isComplete && (
        <div className="completion-message">
          <h3>Good Job! You completed this lesson!</h3>
          <p>Points: {points} / {questions.length}</p>
          <p>You are progressing to the next level...</p>

          {/* Buttons to either go to the next lesson or cancel */}
          {showButtons && (
            <div className="completion-buttons">
              <button onClick={handleNextLesson}>
                Go to Next Lesson
              </button>
              <button onClick={handleCancel}>
                Cancel and Go Back to Lessons
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Questions;
