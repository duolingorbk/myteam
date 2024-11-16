import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LanguageSelector from './components/LanguageSelector';
import Lessons from './components/lessons.jsx';
import Questions from './components/Questions';
import './App.css';
function App() {
  const [language, setLanguage] = useState(null);  // Track selected language

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* <Route path="/" element={<LanguageSelector setLanguage={setLanguage} />} /> */}
          {<Route path="/lessons" element={<Lessons language={language} />} />}
          <Route path="/questions/:lessonId" element={<Questions />} />
          {/* <Route path="/toNextLesson" element={<ToNextLesson />} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;