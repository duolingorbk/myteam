import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/CreateLesson.css';

const CreateLessonForm = () => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('english');
  const [questions, setQuestions] = useState([
    { content: '', answers: [{ content: '', status: 0 }, { content: '', status: 0 }, { content: '', status: 0 }] }
  ]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const lessonData = {
      title,
      language,
      questions: questions.map(q => ({
        content: q.content,
        answers: q.answers.map(a => ({ content: a.content, status: a.status }))
      }))
    };

    axios.post('http://localhost:3000/admin/createlesson', lessonData)
      .then((response) => {
        navigate(`/adminquestions/${response.data.lesson.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].answers[aIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { content: '', answers: [{ content: '', status: 0 }, { content: '', status: 0 }, { content: '', status: 0 }] }
    ]);
  };

  return (
    <div className="create-lesson-container">
      <h2>Create a New Lesson</h2>

      <form className="createLessonForm" onSubmit={handleSubmit}>
        <div className="createInputFlex">
          <label className="createLabel">Title:</label>
          <input
            type="text"
            className="createLessonTitleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="createInputFlex">
          <label className="createLabel">Language:</label>
          <select
            className="createLanguageInput"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          >
            <option value="english">English</option>
            <option value="french">French</option>
          </select>
        </div>

        <div>
          <h3>Questions</h3>
          {questions.map((q, qIndex) => (
            <div key={qIndex} style={{ marginBottom: '10px' }}>
              <div className="createInputFlex">
                <label className="createLabel">Question {qIndex + 1}:</label>
                <input
                  type="text"
                  className="createQuestionInput"
                  value={q.content}
                  onChange={(e) => handleInputChange(qIndex, 'content', e.target.value)}
                  required
                />
              </div>

              <div>
                <h4>Answers</h4>
                {q.answers.map((a, aIndex) => (
                  <div key={aIndex} className="createInputFlex">
                    <label className="createLabel">Answer {aIndex + 1}:</label>
                    <input
                      type="text"
                      className="createAnswerInput"
                      value={a.content}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'content', e.target.value)}
                      required
                    />
                    <label className="createLabel">Status (0 or 1):</label>
                    <input
                      type="number"
                      className="createAnswerStatus"
                      value={a.status}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, 'status', e.target.value)}
                      min="0"
                      max="1"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="createInputFlex">
          <button type="button" className="createAddButton" onClick={addQuestion}>Add Question</button>
        </div>

        <div>
          <button type="submit" className="createSubmitButton">Create Lesson</button>
        </div>
      </form>
    </div>
  );
};

export default CreateLessonForm;
