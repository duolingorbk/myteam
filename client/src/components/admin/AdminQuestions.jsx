import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../css/questionsAnswers.css";

const AdminQuestions = () => {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
                    <td>{question.content}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="update"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                  { question.Answers.map((answer, index) => (
                    <tr key={answer.id} className="answer">
                      <td>Answer {index + 1}</td>
                      {isEditing ? (
                        <td><input type="text" defaultValue={answer.content} /></td>
                      ) : (
                        <td>{answer.content}</td>
                      )}
                      <td>
                        <button
                          className="delete"
                          onClick={() => handleDeleteAnswer(answer.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="update"
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminQuestions;
