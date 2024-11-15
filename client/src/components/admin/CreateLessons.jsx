import React, { useState } from 'react';
import { Plus, Minus, Send } from 'lucide-react';
import "../../css/create.css";

const CreateLesson = () => {
  const [formData, setFormData] = useState({
    title: '',
    language: '',
    progress: 0,
    questions: [
      {
        content: '',
        answers: [
          { content: '', status: 'incorrect' }
        ]
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Add a new question
  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, {
        content: '',
        answers: [{ content: '', status: 'incorrect' }]
      }]
    }));
  };

  // Remove a question
  const removeQuestion = (questionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== questionIndex)
    }));
  };

  // Add an answer to a specific question
  const addAnswer = (questionIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            answers: [...question.answers, { content: '', status: 'incorrect' }]
          };
        }
        return question;
      })
    }));
  };

  // Remove an answer from a specific question
  const removeAnswer = (questionIndex, answerIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            answers: question.answers.filter((_, idx) => idx !== answerIndex)
          };
        }
        return question;
      })
    }));
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle question content changes
  const handleQuestionChange = (questionIndex, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, index) => {
        if (index === questionIndex) {
          return { ...question, content: value };
        }
        return question;
      })
    }));
  };

  // Handle answer changes
  const handleAnswerChange = (questionIndex, answerIndex, field, value) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...question,
            answers: question.answers.map((answer, aIndex) => {
              if (aIndex === answerIndex) {
                return { ...answer, [field]: value };
              }
              return answer;
            })
          };
        }
        return question;
      })
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setSuccess(true);
      setFormData({
        title: '',
        language: '',
        progress: 0,
        questions: [{ content: '', answers: [{ content: '', status: 'incorrect' }] }]
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Lesson Info */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Lesson Title"
            className="form-control"
            required
          />
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Programming Language"
            className="form-control"
            required
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {formData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-container">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={question.content}
                  onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                  placeholder="Question Content"
                  className="flex-1 form-control"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                  className="remove-btn"
                >
                  <Minus size={20} />
                </button>
              </div>

              {/* Answers */}
              <div className="pl-6 space-y-2">
                {question.answers.map((answer, answerIndex) => (
                  <div key={answerIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={answer.content}
                      onChange={(e) => handleAnswerChange(questionIndex, answerIndex, 'content', e.target.value)}
                      placeholder="Answer Content"
                      className="flex-1 form-control"
                      required
                    />
                    <select
                      value={answer.status}
                      onChange={(e) => handleAnswerChange(questionIndex, answerIndex, 'status', e.target.value)}
                      className="form-control"
                    >
                      <option value="correct">Correct</option>
                      <option value="incorrect">Incorrect</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeAnswer(questionIndex, answerIndex)}
                      className="remove-btn"
                    >
                      <Minus size={20} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addAnswer(questionIndex)}
                  className="add-btn"
                >
                  <Plus size={20} /> Add Answer
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="add-btn"
        >
          <Plus size={20} /> Add Question
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="submit-btn"
        >
          {loading ? 'Creating...' : (
            <>
              <Send size={20} />
              Create Lesson
            </>
          )}
        </button>

        {/* Error and Success Messages */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        {success && (
          <div className="success-message">
            Lesson created successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateLesson;
