// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './UserList.css' // Ensure this CSS file is in the same directory

// export const UserList = ({ refresh }) => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/news');
//       setUsers(response.data);
//     } catch (err) {
//       console.error('Error fetching users:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [refresh]);

//   return (
//     <div className="user-card-container">
//       {users.map(user => (
//         <div className="user-card" key={user._id}>
//           <img
//             src={`http://localhost:5000/${user.filePath}`}
//             alt="Profile"
//             className="user-card-image"
//           />
//           <div className="user-card-content">
//             <h3>{user.name}</h3>
//             <p>{user.permanentAddress}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css' // Ensure this CSS file is in the same directory

export const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/news');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  return (
    <div className="user-card-container">
      {users.map(user => (
        <div className="user-card" key={user._id}>
          <img
            src={`http://localhost:5000/${user.filePath}`}
            alt="Profile"
            className="user-card-image"
          />
          <div className="user-card-content">
             <p> {user.category}</p>
            <h3>{user.heading}</h3>
            <p>{user.newscontent}</p>
          
          </div>
        </div>
      ))}
    </div>
  );
};