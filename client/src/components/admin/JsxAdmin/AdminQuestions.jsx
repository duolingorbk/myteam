import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../admin/css/questionsAnswers.css";

const AdminQuestions = () => {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [questionContent, setQuestionContent] = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (lessonId) {
      axios.get(`http://127.0.0.1:3000/questions/everything/${lessonId}`)
        .then((res) => {
          setQuestions(res.data);
        })
        .catch((err) => {
          console.error("Error fetching questions and answers:", err);
        });
    }
  }, [lessonId, refresh]);

  const handleDeleteQuestion = (questionId) => {
    axios.delete(`http://127.0.0.1:3000/questions/delete/${questionId}`)
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteAnswer = (answerId) => {
    axios.delete(`http://127.0.0.1:3000/Answers/delete/${answerId}`)
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleQuestionUpdate = (id) => {
    axios.put(`http://127.0.0.1:3000/questions/updatequestion/${id}`, { content: questionContent })
      .then((response) => {
        console.log('Question updated:', response.data);
        setRefresh(!refresh);
        setShowUpdate(false);
        setSelectedQuestionId(null);
        setQuestionContent('');
      })
      .catch((err) => {
        console.error('Error updating question:', err);
      });
  };

  const handleAnswerUpdate = (id) => {
    axios.put(`http://127.0.0.1:3000/Answers/updateAnswer/${id}`, { content: answerContent })
      .then((response) => {
        console.log('Answer updated:', response.data);
        setRefresh(!refresh);
        setSelectedAnswerId(null);
        setAnswerContent('');
      })
      .catch((err) => {
        console.error('Error updating answer:', err);
      });
  };

  return (
    <div className="admin">
      <div className="mainTable">
        <h2>Questions for Lesson {lessonId}</h2>
        {questions.length === 0 ? (
          <p>No questions available for this lesson.</p>
        ) : (
          questions.map((question) => (
            <div className="question" key={question.id}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="question-row">
                    <td>Question</td>
                    <td>
                      {showUpdate && selectedQuestionId === question.id ? (
                        <input
                          type="text"
                          defaultValue={question.content}
                          onChange={(e) => setQuestionContent(e.target.value)}
                        />
                      ) : (
                        question.content
                      )}
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="update"
                        onClick={() => {
                          setShowUpdate(true);
                          setSelectedQuestionId(question.id);
                          setQuestionContent(question.content);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>

                  {question.Answers.map((answer, index) => (
                    <tr key={answer.id} className="answer">
                      <td>Answer {index + 1}</td>
                      <td>
                        {showUpdate && selectedAnswerId === answer.id ? (
                          <input
                            type="text"
                            defaultValue={answer.content}
                            onChange={(e) => setAnswerContent(e.target.value)}
                          />
                        ) : (
                          answer.content
                        )}
                      </td>
                      <td>
                        <button
                          className="delete"
                          onClick={() =>{ handleDeleteAnswer(answer.id ) ;
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="update"
                          onClick={() => {
                            setShowUpdate(true);
                            setSelectedAnswerId(answer.id);
                            setAnswerContent(answer.content);
                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showUpdate && selectedQuestionId === question.id && (
                <div>
                  <button className='saveUpdate' onClick={()=>handleQuestionUpdate(question.id)}>Save Changes</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminQuestions;