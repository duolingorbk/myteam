import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [averageProgress, setAverageProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get lesson progress from localStorage
  const getLessonProgress = (lessonId) => {
    const progress = localStorage.getItem(`lesson${lessonId}Progress`);
    return progress ? parseInt(progress) : 0;
  };

  // Calculate average progress
  const calculateAverageProgress = (lessonsArray) => {
    if (!lessonsArray.length) return 0;
    
    const totalProgress = lessonsArray.reduce((sum, lesson) => {
      const progress = getLessonProgress(lesson.id);
      return sum + progress;
    }, 0);

    return Math.round(totalProgress / lessonsArray.length);
  };

  // Fetch lessons and calculate progress
  const fetchLessonsAndProgress = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/lesson/all/${language}`);
      setLessons(res.data);
      const average = calculateAverageProgress(res.data);
      setAverageProgress(average);
    } catch (err) {
      console.error("Error fetching lessons:", err);
    }
  };

  const handleAvatar = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/image/${id}`);
      setAvatar(res.data.image);
    } catch (err) {
      console.error("Error fetching avatar:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          id: decodedToken.id,
          name: decodedToken.name || 'Unknown',
          email: decodedToken.email || 'Unknown',
          joinDate: new Date(decodedToken.iat * 1000).toLocaleDateString(),
        });

        if (decodedToken.id) {
          handleAvatar(decodedToken.id);
        }

        fetchLessonsAndProgress();
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/user/login");
      }
    } else {
      navigate("/user/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/user/login");
  };

  if (loading || !user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {avatar ? (
            <img 
              src={avatar} 
              alt="Profile" 
              onError={(e) => {
                e.target.src = '/default-avatar.png';
              }}
            />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h1>{user.name}</h1>
        <p className="email">{user.email}</p>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <i className="fas fa-calendar-alt"></i>
          <h3>Member Since</h3>
          <p>{user.joinDate}</p>
        </div>
        <div className="stat-card">
          <i className="fas fa-chart-line"></i>
          <h3>Overall Progress</h3>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${averageProgress}%` }}
              />
            </div>
            <span className="progress-text">{averageProgress}%</span>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-book"></i>
          <h3>Lessons Completed</h3>
          <p>{lessons.filter(lesson => getLessonProgress(lesson.id) === 100).length}</p>
        </div>
      </div>

      <div className="lessons-progress">
        <h2>Lesson Progress</h2>
        <div className="lessons-grid">
          {lessons.map((lesson) => {
            const progress = getLessonProgress(lesson.id);
            return (
              <div key={lesson.id} className="lesson-progress-card">
                <h4>{lesson.title}</h4>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="progress-text">{progress}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;