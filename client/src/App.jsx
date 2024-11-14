import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import Lessons from './components/Lessons.jsx';
import Questions from './components/Questions';
import Home from './components/Home/Home.jsx';
import Profile from './components/Home/Profile.jsx';
import Navbar from './components/Home/Navbar.jsx';
import './App.css';
function App() {
  const [language, setLanguage] = useState(null);  // Track selected language

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Selectlanguage" element={<LanguageSelector setLanguage={setLanguage} />} />
          {language && <Route path="/lessons" element={<Lessons language={language} />} />}
          <Route path="/questions/:lessonId" element={<Questions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
