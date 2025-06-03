import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found, please login');
          return;
        }
        const response = await axios.get('http://localhost:5000/auth/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
        setNews(response.data.news);
      } catch (error) {
        alert('Failed to fetch dashboard data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Please login first.</div>;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Your email: {user.email}</p>
      <p>Your location: {user.location}</p>

      <h2>Hyperlocal News</h2>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;