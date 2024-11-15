
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate=useNavigate()
  const [user, setuser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/user/login")
  };

  useEffect(() => {
    const token = localStorage.getItem('token');    
    if (token) {
      try {
        const decodedtoken = jwtDecode(token);

        setuser({
          name: decodedtoken.name || 'Unknown',
          email: decodedtoken.email || 'Unknown',
          joinDate: decodedtoken.joinDate || 'Unknown',  
          level: decodedtoken.level || 'Beginner',
          languagesLearning: decodedtoken.languages || ["english","french"],
          progress: decodedtoken.progress || 0,
        });
      } catch (error) {
        console.error("Error decoding the token:", error);
      }
    } else {
      console.log("No token found.");
    }
  }, []); 

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="https://via.placeholder.com/150" alt="Profile" />
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
          <h3>Level</h3>
          <p>{user.level}</p>
        </div>
        <div className="stat-card">
          <i className="fas fa-fire"></i>
          <h3>Current Streak</h3>
          <p>{user.streakDays} days</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="languages-section">
          <h2>Languages Learning</h2>
          <div className="language-list">
            {user.languagesLearning.map((language, index) => (
              <span key={index} className="language-tag">{language}</span>
            ))}
          </div>
        </div>

        <div className="progress-section">
          <h2>Learning Progress</h2>
          <div className="progress-info">
            <p>Your progress: {user.progress}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(user.progress / 100) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
          <i></i> Logout
        </button>
    </div>
  );
};

export default Profile;
























// import React from 'react';
// import './Profile.css';

// const Profile = () => {
//   const userInfo = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     joinDate: "January 2024",
//     level: "Intermediate",
//     languagesLearning: ["French", "Spanish", "German"],
//     completedLessons: 42,
//     streakDays: 15
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           <img src="https://via.placeholder.com/150" alt="Profile" />
//         </div>
//         <h1>{userInfo.name}</h1>
//         <p className="email">{userInfo.email}</p>
//       </div>

//       <div className="profile-stats">
//         <div className="stat-card">
//           <i className="fas fa-calendar-alt"></i>
//           <h3>Member Since</h3>
//           <p>{userInfo.joinDate}</p>
//         </div>
//         <div className="stat-card">
//           <i className="fas fa-chart-line"></i>
//           <h3>Level</h3>
//           <p>{userInfo.level}</p>
//         </div>
//         <div className="stat-card">
//           <i className="fas fa-fire"></i>
//           <h3>Current Streak</h3>
//           <p>{userInfo.streakDays} days</p>
//         </div>
//       </div>

//       <div className="profile-details">
//         <div className="languages-section">
//           <h2>Languages Learning</h2>
//           <div className="language-list">
//             {userInfo.languagesLearning.map((language, index) => (
//               <span key={index} className="language-tag">{language}</span>
//             ))}
//           </div>
//         </div>

//         <div className="progress-section">
//           <h2>Learning Progress</h2>
//           <div className="progress-info">
//             <p>Completed Lessons: {userInfo.completedLessons}</p>
//             <div className="progress-bar">
//               <div className="progress" style={{ width: '60%' }}></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;