import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Lessons.css';

function Lessons({ language }) {
    const [lessons, setLessons] = useState({ easy: [], medium: [], hard: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/lesson/all/${language}`)
            .then(res => {
                const lessonData = res.data;
                const categorizedLessons = { easy: [], medium: [], hard: [] };
                lessonData.forEach(lesson => {
                    if (categorizedLessons[lesson.level]) {
                        categorizedLessons[lesson.level].push(lesson);
                    }
                });

                setLessons(categorizedLessons);
            })
            .catch(err => {
                setError('Failed to fetch lessons');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [language]);

    const handleLessonClick = (lessonId) => {
        navigate(`/questions/${lessonId}`);
    };

    if (loading) return <p>Loading lessons...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="lessons-container">
            <h2>{language.toUpperCase()} Lessons</h2>

            {['easy', 'medium', 'hard'].map(level => (
                <div key={level} className={`${level}-lessons`}>
                    <h3>{level.charAt(0).toUpperCase() + level.slice(1)} Level</h3>
                    <ul className="lesson-list">
                        {lessons[level].map(lesson => (
                            <li key={lesson.id} className="lesson-item">
                                {/* Progress button */}
                                <button 
                                    className="button button-border button-base" 
                                    onClick={() => handleLessonClick(lesson.id)}
                                    style={{
                                        background: `linear-gradient(to right, #00b164 ${lesson.progress}%, #ddd ${lesson.progress}%)`,
                                        color: lesson.progress === 100 ? '#fff' : '#000',
                                    }}
                                >
                                    {lesson.title} - {lesson.progress}% Progress
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Lessons;
