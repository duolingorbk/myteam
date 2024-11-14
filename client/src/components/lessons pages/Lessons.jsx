import React, { useState } from 'react';
import ToNextLesson from './ToNextLesson';

export default function Lessons() {
  const [questions, setQuestions] = useState([
    { id: 1, content: 'What is the French word for "Hello"?' },
    { id: 2, content: 'What is the French word for "Thank you"?' },
    { id: 3, content: 'What is the French word for "Goodbye"?' },
  ]);
  
  const [answers, setAnswers] = useState([
    { content: 'Bonjour', status: 1, QuestionId: 1 },
    { content: 'Merci', status: 0, QuestionId: 1 },
    { content: 'Au revoir', status: 0, QuestionId: 1 },
    { content: 'Merci', status: 1, QuestionId: 2 },
    { content: 'Salut', status: 0, QuestionId: 2 },
    { content: 'Adieu', status: 0, QuestionId: 2 },
    { content: 'Au revoir', status: 1, QuestionId: 3 },
    { content: 'Bonsoir', status: 0, QuestionId: 3 },
    { content: 'Salut', status: 0, QuestionId: 3 },
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const getAnswersForCurrentQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return answers.filter(answer => answer.QuestionId === currentQuestion.id);
  };

  const incrementing = () => {
    // Only increment if not at the last question
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = getAnswersForCurrentQuestion();

  return (
    <div className=''>
      {currentQuestionIndex < questions.length ? (
        <>
          <h1 className='question-number-render'>Question {currentQuestionIndex + 1}</h1>
          <h3 className='question-render'>{currentQuestion.content}</h3>
          
          {currentAnswers.map((answer, index) => (
            <button className='answer-render' key={index} onClick={incrementing}> 
              {answer.content}
            </button>
          ))}
        </>
      ) : (
        <ToNextLesson />
      )}
    </div>
  );
}
