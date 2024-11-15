import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguageSelector from './components/lesonss&&questions/LanguageSelector.jsx';
import Lessons from './components/lesonss&&questions/Lessons.jsx';
import Questions from './components/lesonss&&questions/Questions.jsx';
import Signup from './components/signup/Signup.jsx';
import Login from './components/signup/Login.jsx';

import './App.css';

function App() {
  const [language, setLanguage] = useState(null); // Track selected language

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LanguageSelector setLanguage={setLanguage} />}
        />
        {language && (<Route path="/lessons"element={<Lessons language={language} />}/> )}
        <Route path="/questions/:lessonId" element={<Questions />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
