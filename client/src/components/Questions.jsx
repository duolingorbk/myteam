import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function Ques() {
  const { lessonId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // const { language } = location.state;  // Retrieve language and lessonId from location.state

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lessonIDD, setlessonIDD] = useState(2);
  const [newStatus, setnewStatus] = useState();


  // Fetch questions for the lesson based on lessonId
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/questions/all/${lessonIDD}`);
      setQuestions(res.data);
      console.log('Questions:', res.data);
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

      console.log("this is id",questions[currentQuestionIndex].id)
    }
  }, [currentQuestionIndex, questions]);



  // Handle incrementing to the next question
  const incrementQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } 
  };
  
  
  //// update the status later 
  const updateAnswer = function() {
    axios.put(`link ${id}`, {status:newStatus} )
    .then((res)=>{
      
    })
    .catch((err)=>{
      console.log('error updating status of answer 😖', err)
    })
  }
  
  // console.log('lessonIDD 🤦‍♀️: ', lessonIDD) 
  console.log('currentQuestionIndex 🤦‍♀️🤦‍♀️: ', currentQuestionIndex) 

  // Render the current question and its answers
  return (
    <div className=''>
      <h2>Questions for Lesson {lessonIDD}</h2>
      {currentQuestionIndex < questions.length -1 ? (
        <>
          <h1 className='question-number-render'>
            Question {currentQuestionIndex + 1}
          </h1>
          <h3 className='question-render'>{questions[currentQuestionIndex].content}</h3>
          
          {answers.map((answer, index) => (
            <button className='answer-render' key={index} onClick={()=>{
              incrementQuestion()
            }}>
              {answer.content}
            </button>
          ))}
        </>
      ) : (
        <>
        <div>
         <h2>You've completed this lesson!</h2>
         <button onClick={()=>{
          setlessonIDD(prev => prev + 1)
          setCurrentQuestionIndex(7)
         }}>Go to Next Lesson</button>
       </div>
        </>
      )}
    </div>
  );
}
