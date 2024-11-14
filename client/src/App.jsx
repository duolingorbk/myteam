import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminQuestions from './components/admin/AdminLessons.jsx';
import AdminInterface from './components/admin/MainInterface.jsx';
import Sidebar from './components/admin/AdminSideBar.jsx';
import Languages from './components/admin/AdminLessons.jsx'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        {/* Main content area */}
        <div className="main-content">
          <div className="header">
            <h1>Mini Language Learning Admin Interface</h1>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<AdminInterface />} />
              <Route path="/adminquestions" element={<AdminQuestions />} />
              <Route path="/adminLanguages" element={<Languages  />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
