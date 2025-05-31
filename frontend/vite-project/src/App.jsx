// import React, { useState } from 'react';
// import RegistrationForm from './components/register';
// import "./App.css"
// import { UserList } from './components/UserList';

// const App = () => {
  
//   const [showUsers, setShowUsers] = useState(false);   // controls visibility
//   const [hasData, setHasData] = useState(false);       // tracks submission

//   // handle form submit: receive trigger from form
//   const handleFormSubmit = () => {
//     setHasData(true);
//     setShowUsers(false); // hide users until button is clicked
//   };

//   return (
//     <>
//     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//       <RegistrationForm onSubmitSuccess={handleFormSubmit} />

//       <button
//         onClick={() => setShowUsers(true)}
//         disabled={!hasData}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           fontSize: '16px',
//           cursor: hasData ? 'pointer' : 'not-allowed',
//           backgroundColor: hasData ? '#007bff' : '#ccc',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px'
//         }}
//       >
//         Submitted Data
//       </button>

//       {showUsers && <UserList/>}
//     </div>
//     </>
//   );
// };


// export default App;








// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import HomePage from './Frontend/HomePage';
// import LanguageSelector from './Frontend/LanguageSelector';
// import LocationSelector from './Frontend/LocationSelector';
// import SignIn from './Frontend/Signin';
// import SignUp from './Frontend/SignUp';
// import Welcome from './Frontend/WelcomePage';
// import SidebarMenu from './Frontend/Menu';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Welcome/>} />
//         <Route path="/signup" element={<SignUp/>} />
//         <Route path="/signin" element={<SignIn/>} />
//         <Route path="/locationselector" element={<LocationSelector/>} />
//         <Route path="/languageselector" element={<LanguageSelector/>} />
//         <Route path="/home" element={<HomePage/>} />
//         <Route path="/menu" element={<SidebarMenu/>} />
        
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Your home page component
import Register from './components/register';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}
export default App;














