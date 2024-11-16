
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function Questions() {
  const { lessonId } = useParams();
  const location = useLocation();
  const { lessons } = location.state ||[] /// console.log this when this compoenet is rendered inside my app.jsx

  const navigate = useNavigate();
  console.log("lessons 😒😒😒😒 :", lessons);

  // const { language } = location.state;  // Retrieve language and lessonId from location.state

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lessonIDD, setlessonIDD] = useState(1);
  const [progress, setprogress] = useState(0);
  const [resultProgress, setresultProgress] = useState(0)

  // console.log('progress :', progress)
  console.log('resultProgress :', resultProgress)

  const [allLessonsProgress, setallLessonsProgress] = useState(0);
  

  console.log('allLessonsProgress ', allLessonsProgress)
  


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
      percentageProgress();
    }
  }, [currentQuestionIndex, questions]);



  // Handle incrementing to the next question
  const incrementQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setlessonIDD((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      setprogress(0); // Reset for the new lesson
      setresultProgress(0); // Reset progress percentage
      ProgressAllLessons(); // Update overall progress
    }
  };
  

  /// adding progress /////////////////////////////////////////////////////////////////////////////////////////////////
  const progressForLesson = function(answerId) {
    const answer = answers.find(elem => elem.id === answerId);
    if (answer && answer.status === 1) {
      setprogress(prev => prev + 1);
    }
  };
  
  const hundleProgress = function(id) {
    progressForLesson(id);
  };
  
  const percentageProgress = function() {
    if (answers.length > 0) {
      const result = (progress / answers.length) * 100; /// I'm using progress here to calculate the reslt progress 
      setresultProgress(result);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////// adding progress /////////



  // const ProgressAllLessons = function(progPerLesson) {
  //    var ProgAll = 0;
  //    var resultAllProg = 0
  //    const FacDivAllLessons = lessons.lenght * 100;

  //    ProgAll = ProgAll + progPerLesson ; 
  //    resultAllProg = ProgAll / FacDivAllLessons ;
  //    setallLessonsProgress(resultAllProg)
    
  //    return 
     
  // }


  const ProgressAllLessons = function() {
    if (!lessons || lessons.length === 0) return; // Avoid errors
    
    // Total progress across all lessons
    const overallProgress = (lessonIDD - 1) * 100 + resultProgress; // Completed lessons + current progress
    const totalLessonsProgress = overallProgress / (lessons.length * 100); // Normalize to percentage
    
    setallLessonsProgress(totalLessonsProgress);
  };
  





  // Render the current question and its answers
  return (
    <div className=''>
      <h1>ALL lessons Progress {allLessonsProgress} %</h1>
      <h2>Questions for Lesson {lessonIDD}</h2>
      <h2>Progress {resultProgress} %</h2>
      {questions.length ? (
        <>
          <h1 className='question-number-render'>
            Question {currentQuestionIndex + 1}
          </h1>
          <h3 className='question-render'>{questions[currentQuestionIndex].content}</h3>
          
          {answers.map((answer, index) => (
            <button 
            className="answer-render" 
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
        </>
      ) : (
        <>
        <div>
         <h2>You've completed this lesson!</h2>
         <button onClick={() => {
             if (lessonIDD < lessons.length) {
               setlessonIDD((prev) => prev + 1);
               setprogress(0); // Reset progress for new lesson
               setresultProgress(0); // Reset progress percentage
               ProgressAllLessons(); // Update overall progress
             } else {
               console.log("No more lessons");
             }
           }}>
             Go to Next Lesson
        </button>

       </div>
        </>
    

      )}
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../../src/App.css'
// function Questions() {
//   const { lessonId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/questions/all/${lessonId}`);
//         setQuestions(res.data);
//       } catch (err) {
//         setError('Failed to fetch questions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [lessonId]);

//   if (loading) return <p>Loading questions...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Questions for Lesson {lessonId}</h2>
//       <ul>
//         {questions.map((question) => (
//           <li key={question.id}>
//             <p>{question.content}</p>
//             <ul>
//               {question.Answers && question.Answers.map((answer) => (
//                 <li key={answer.id}>{answer.content}</li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Questions;
