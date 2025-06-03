import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Authentication.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Sending POST request to your backend login endpoint
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,  // or username if your backend expects username
        password,
      });

      // Assuming backend returns a token on success
      const { token } = response.data;

      // Store token in localStorage or cookies for future authenticated requests
      localStorage.setItem('token', token);

      alert('Login successful!');
      navigate('/languageselector'); // redirect to dashboard or theme page
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <div className="switch-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;