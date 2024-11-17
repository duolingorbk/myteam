


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import './Questions.css'

export default function Questions() {
   const { lessonId } = useParams();
  const location = useLocation();
  const { lessons } = location.state || []; /// console.log this when this compoenet is rendered inside my app.jsx
  
  
  const navigate = useNavigate();
  
  
  // const { language } = location.state;  // Retrieve language and lessonId from location.state

  const [questions, setQuestions] = useState(lessons);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lessonIDD, setlessonIDD] = useState(lessonId); // instead of 1 
  const [progress, setprogress] = useState(0);
  const [resultProgress, setresultProgress] = useState(0);


  console.log("lessonIDD 😒😒😒😒 :", typeof(lessonIDD));

  // console.log('progress :', progress)
  // console.log('resultProgress :', resultProgress)

  const [allLessonsProgress, setallLessonsProgress] = useState(0);

  // console.log('allLessonsProgress ', allLessonsProgress)

  // Fetch questions for the lesson based on lessonId
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/questions/all/${lessonIDD}`
      );
      setQuestions(res.data);
      console.log("Questions:", res.data);
    } catch (err) {
      console.log("Error fetching questions:", err);
    }
  };

 
  // Fetch answers for the current question based on questionId
  const fetchAnswers = async (questionId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/Answers/${questionId}`
      );
      setAnswers(res.data);
      console.log("Answers for question", questionId, ":", res.data);
    } catch (err) {
      console.log("Error fetching answers:", err);
    }
  };

  // Fetch questions initially when the component mounts
  useEffect(() => {
    fetchQuestions();
    console.log("hello hello ");
  }, [lessonIDD]);

  // Fetch answers whenever the current question index changes
  useEffect(() => {
    if (questions.length > 0) {
      fetchAnswers(questions[currentQuestionIndex].id);
      percentageProgress();
    }
  }, [currentQuestionIndex, questions]);

  // Handle incrementing to the next question
  const incrementQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setlessonIDD((prev) => parseInt(prev) + 1);
      setCurrentQuestionIndex(0);
      setprogress(0); // Reset for the new lesson
      setresultProgress(0); // Reset progress percentage
      ProgressAllLessons(); // Update overall progress
    }
  };

  /// adding progress per lesson /////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////:   1     :///////////////////
  const progressForLesson = function (answerId) {
    const answer = answers.find((elem) => elem.id === answerId);
    if (answer && answer.status === 1) {
      setprogress((prev) => prev + 1);  //// progress per lesson "without" percentage 
    }
  };

  ///////////////////:   3    :///////////////////
  const hundleProgress = function (id) {   //// this func will be invoked
    progressForLesson(id);
  };

  ///////////////////:   2    :///////////////////
  const percentageProgress = function () {
    if (answers.length > 0) {
      const result = (progress / questions.length) * 100; //// progress per lesson "with" percentage 
      setresultProgress(result);
    }
  };

  /////////////////////////////////////////////////////////adding progress per lesson /////////

  // const [resultfinalPrgress, setresultfinalPrgress] = useState();

  // const ProgressAllLessons = function() {
  //   var result = 0
  //    var lessonsPercent = lessons.length * 100
  //    setallLessonsProgress(prev =>
  //     prev + resultProgress
  //    )

  //    result = lessonsPercent / allLessonsProgress 
  //    setresultfinalPrgress(result)

  // }


  ////// ProgressAllLessons ////////////////////////////////////////////////////////////////////////////
  const ProgressAllLessons = function () {
    if (!lessons || lessons.length === 0) return; // Avoid errors

    // Total progress across all lessons
    const overallProgress = (lessonIDD - 1) * 100 + resultProgress; // Completed lessons + current progress
    const totalLessonsProgress = overallProgress / (lessons.length ); // Normalize to percentage

    setallLessonsProgress(totalLessonsProgress);
  };

  console.log("currentQuestionIndex", currentQuestionIndex);

  console.log("questions length", questions.length);
  ///////////////////////////////////////////////////////////////////////////// ProgressAllLessons /////


  

  // Render the current question and its answers
  return (
    <div className="">
      <nav className="nav-all-lessons-progress">ALL lessons Progress {resultProgress} %</nav>
      <h2 className="h2-questions-for-lesson">Questions for Lesson {lessonIDD}</h2>
      <h2 className="h2-progress-per-lesson">Progress {resultProgress} %</h2>
      {currentQuestionIndex === questions.length  ? (
        <>
          <div className="div-you-completed-lesson">
            <h2 className="h2-you-completed-lesson">You've completed this lesson!</h2>
            <button
            className="button-you-completed-lesson"
              onClick={() => {
                if (lessonIDD < lessons.length) {
                  setlessonIDD((prev) => prev + 1);
                  setprogress(0); // Reset progress for new lesson
                  setresultProgress(0); // Reset progress percentage
                  ProgressAllLessons(); // Update overall progress
                } else {
                  console.log("No more lessons");
                }
              }}
            >
              Go to Next Lesson
            </button>
          </div>
        </>
      ) : (
        <>
        <div className="div-question-answers">
          <h1 className="h1-question-number">
            Question {currentQuestionIndex +1 }
          </h1>
          <h3 className="h3-question-content">
            {questions[currentQuestionIndex].content}
          </h3>

          {answers.map((answer, index) => (
            <button
              className="button-answer-per-question"
              key={index}
              onClick={() => {
                incrementQuestion();
                hundleProgress(answer.id);
                percentageProgress();
              }}
            >
              {answer.content}
            </button>
          ))}
          </div>
        </>
      )}
    </div>
  );
}
