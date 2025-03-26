import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const userId = decoded.id;
          const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setUser(response.data.data);
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error fetching user details:', error.message);
        }
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Your Profile</h2>
        <div className="profile-content">
          <div className="profile-info">
            <p><span>Username:</span> {user.username}</p>
            <p><span>Email:</span> {user.email}</p>
          </div>
          {user.photo && (
            <div className="profile-photo">
              <img src={user.photo} alt="Profile" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
