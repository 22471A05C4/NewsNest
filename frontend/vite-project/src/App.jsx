 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import WelcomePage from './Components/WelcomePage';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import ThemeSelector from './Components/ThemeSelector';
import Dashboard from './Components/Dashboard';
import LanguageSelector from './components/LanguageSelector';
import LocationSelector from './components/LocationSelector';
import HomePage from './components/HomePage';
import SidebarMenu from './components/menu';
import PostForm from './components/Post';

function App() {
  

  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/theme" element={<ThemeSelector/>} />
        <Route path="/languageselector" element={<LanguageSelector/>} />
        <Route path="/locationselector" element={<LocationSelector/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/menu" element={<SidebarMenu/>} />
        <Route path="/post" element={<PostForm/>} />


      </Routes>
    </Router>


    </>
  )
}

export default App