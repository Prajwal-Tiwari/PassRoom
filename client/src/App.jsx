import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx';
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/LogIn.jsx'
import Signup from './pages/SignUp.jsx'
import { AuthProvider } from './context/AuthContext.jsx';


function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
     </AuthProvider>
  );
}

export default App;
