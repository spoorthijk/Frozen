// Settings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './settings.css';

const Settings = () => {
  // Retrieve token from localStorage and decode to get userId.
  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;

  console.log(userId)

  // State for user details and feedback message.
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  
  const [message, setMessage] = useState('');

  // Fetch current user data on component mount.
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8000/api/v1/users/${userId}`)
        .then(response => {
          setUserData({
            username: response.data.data.username || '',
            email: response.data.data.email || '',
          });          
        })
        .catch(error => {
          setMessage('Error fetching user data');
        });
    }
  }, [userId]);

  // Handle input changes and update local state.
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the user profile.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/users/${userId}`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Update failed.');
      }
    } catch (error) {
      setMessage('An error occurred while updating.');
    }
  };

  return (
    <div className="settings-section">
      <h2>Settings</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text"
            name="username"  // Changed from "name" to "username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add additional fields as needed */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Settings;
