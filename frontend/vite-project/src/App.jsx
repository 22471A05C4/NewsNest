// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import RegistrationForm from "./components/register";


// import "./App.css";
// import Signin from './components/Signin';

// const Home = ({ onRegister, hasData }) => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <RegistrationForm onSubmitSuccess={onRegister} />
//       <button
//         onClick={() => navigate('/signin')}
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
//         Sign In
//       </button>
//     </div>
//   );
// };

// const App = () => {
//   const [showSignin, setShowSignin] = useState(false);
//   const [hasData, setHasData] = useState(false);

//   // Called after successful registration
//   const handleFormSubmit = () => {
//     alert("Registeres Successfully")
//     setHasData(true);
    
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home onRegister={handleFormSubmit} hasData={hasData} />} />
//         <Route path="/signin" element={<Signin/>} />
//       </Routes>
//     </Router>
    
//   );
// };

// export default App;






import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RegistrationForm from './components/register';  // Or './components/Post' based on your actual file
import Signin from './components/Signin';


import './App.css';

import PostForm from './components/Post';
import { UserList } from './components/UserList';
import HomePage from './components/HomePage';


// Home component with registration form and buttons
// const Home = ({ onRegister, hasData }) => {
//   const navigate = useNavigate();
//   const [showUsers, setShowUsers] = useState(false);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//       <RegistrationForm onSubmitSuccess={onRegister} />

//       <button
//         onClick={() => setShowUsers(true)}
//         disabled={!hasData}
//         style={{
//           marginTop: '20px',
//           marginRight: '10px',
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

//       <button
//         onClick={() => navigate('/signin')}
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
//         Sign In
//       </button>

//       {showUsers && <UserList />}
//     </div>
//   );
// };

// Main App component with routes
const App = () => {
  // const [hasData, setHasData] = useState(false);

  // const handleFormSubmit = () => {
  //   alert("Registered Successfully");
  //   setHasData(true);
  // };
   const [showUsers, setShowUsers] = useState(false);   // controls visibility
  const [hasData, setHasData] = useState(false);       // tracks submission

  // handle form submit: receive trigger from form
  const handleFormSubmit = () => {
    setHasData(true);
    setShowUsers(false); // hide users until button is clicked
  };


  return (
<>
 <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <PostForm onSubmitSuccess={handleFormSubmit} />

      

      {showUsers && <UserList />}
    </div>

    
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
         {/* <Route path="/home" element={<HomePage/>} />
        
       */}
        <Route path="/menu" element={<menu/>} />
        <Route path="/post" element={<PostForm/>} />
        
      </Routes>
    </Router>
    </>
  );
};

export default App;
