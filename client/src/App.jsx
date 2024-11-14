
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Home from './components/Home/Home'; 
import Navbar from './components/Home/Navbar'; 
import Profile from './components/Home/Profile';

function App() {
  return (
    <div>
    <Router> 
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} /> */}

        <Route path="/Profile" element={<Profile />} />
    
      </Routes>
      
    </Router>
    </div>
  );
}

export default App;




