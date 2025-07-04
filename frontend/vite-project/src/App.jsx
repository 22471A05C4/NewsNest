 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Signup from './components/SignUp';
import ThemeSelector from './components/ThemeSelector';
import Dashboard from './components/Dashboard';
import LanguageSelector from './components/LanguageSelector';
import LocationSelector from './components/LocationSelector';
import HomePage from './components/HomePage';
import SidebarMenu from './components/menu';
import PostForm from './components/Post';
import Navbar from './components/Navbar';
import News from './components/SearchBar';
import { useState } from 'react';

function App() {
  const[query,setQuery]=useState('');
  const[language,setLanguage]=useState('English');
  
const handleSearch=(newQuery,selectedLang)=>{
  setQuery(newQuery);
  setLanguage(selectedLang);
}
  return (
    <>
    
    <Router>
      {/* <Navbar onSearch={handleSearch}/>
      <News searchQuery={query} language={language}/> */}
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