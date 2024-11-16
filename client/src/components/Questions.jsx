


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../src/App.css'
function Questions() {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/questions/all/${lessonId}`);
        setQuestions(res.data);
      } catch (err) {
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [lessonId]);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Questions for Lesson {lessonId}</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.content}</p>
            <ul>
              {question.Answers && question.Answers.map((answer) => (
                <li key={answer.id}>{answer.content}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
