import React , {useState}  from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import Lessons from './components/lessons.jsx';
import Questions from './components/Questions';
import Home from './components/Home/Home.jsx';
import Profile from './components/Home/Profile.jsx';
import Navbar from './components/Home/Navbar.jsx';
import Signup from "./components/signup/Signup.jsx"
import Login from "./components/signup/Login.jsx"
import AdminQuestions from './components/admin/JsxAdmin/AdminQuestions.jsx';
import AdminInterface from './components/admin/JsxAdmin/MainInterface.jsx';
import Sidebar from './components/admin/JsxAdmin/AdminSideBar.jsx';
import Languages from './components/admin/JsxAdmin/AdminLessons.jsx';
import CreateLesson from './components/admin/JsxAdmin/CreateLessons.jsx';

import './App.css';
function App() {
  const [language, setLanguage] = useState(null);  // Track selected language
  const user = JSON.parse(localStorage.getItem('user'))


  return (
      
        
<Router>
 <Routes>
  <Route path="/user/signup" element={<Signup />} />
    <Route path="/user/login" element={<Login />} />
  </Routes>

  {user &&user.type === "user"  ? (
     <>
     <Navbar />
     <div className="app-container">
       <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
         <Route path="/Selectlanguage" element={<LanguageSelector setLanguage={setLanguage} />} />
       {language && <Route path="/lessons" element={<Lessons language={language} />} />}
         <Route path="/questions/:lessonId" element={<Questions />} />
       </Routes>
     </div>
   </>
    
  ) : (
    <>
    <Sidebar />
    <div className="main-content">
    <div className="Admin-header">
            <h1>Mini Language Learning Admin Interface</h1>
          </div>
     <Routes>
  <Route path="/admin-dashboard" element={<AdminInterface />} />
        <Route path="/adminquestions/:lessonId" element={<AdminQuestions />} />
        <Route path="/adminLanguages" element={<Languages />} />
     <Route path="/createLesson" element={<CreateLesson />} />
      </Routes>
    </div>
  </>
  )}
</Router>
    
  );
}

export default App;