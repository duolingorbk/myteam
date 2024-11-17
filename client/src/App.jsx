import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguageSelector from './components/lesonss&&questions/LanguageSelector.jsx';
import Lessons from './components/lesonss&&questions/lessons.jsx';
import Questions from './components/lesonss&&questions/Questions.jsx';
import Home from './components/Home/Home.jsx';
import Profile from './components/Home/Profile.jsx';
import Navbar from './components/Home/Navbar.jsx';
import Signup from "./components/signup/Signup.jsx"
import Login from "./components/signup/Login.jsx";
import './App.css';

function App() {
  const [language, setLanguage] = useState(null); // Track selected language

  return (
    <div>
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
        <Route path="/user/signup" element={<Signup/>}/>
        <Route path="/user/login" element={<Login/>}/>
        <Route path="/" element={<Home/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Selectlanguage" element={<LanguageSelector setLanguage={setLanguage} />} />
          {language && <Route path="/lessons" element={<Lessons language={language} />} />}
          <Route path="/questions/:lessonId" element={<Questions />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
