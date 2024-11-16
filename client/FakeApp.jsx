import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminQuestions from './src/components/admin/JsxAdmin/AdminQuestions.jsx';
import AdminInterface from './src/components/admin/JsxAdmin/MainInterface.jsx'; 
import Sidebar from './src/components/admin/JsxAdmin/AdminSideBar.jsx';
import Languages from './src/components/admin/JsxAdmin/AdminLessons.jsx';
import CreateLesson from './src/components/admin/JsxAdmin/CreateLessons.jsx';
function FakeApp() {
  return (
    <div>
    <Router>
      <div className="Adminapp-container">
        <Sidebar />
        <div className="main-content">
          <div className="header">
            <h1>Mini Language Learning Admin Interface</h1>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<AdminInterface />} />
              <Route path="/adminquestions/:lessonId" element={<AdminQuestions />} /> {/* Handle dynamic lessonId */}
              <Route path="/adminLanguages" element={<Languages />} /> 
              <Route path="/createLesson" element={<CreateLesson />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default FakeApp;
