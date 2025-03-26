// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch('http://localhost:8000/api/v1/bookings/user', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setBookings(data.data);
        } else {
          console.error("Error fetching bookings:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab]);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeTab === 'bookings' ? 'active' : ''} 
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </li>
            <li 
              className={activeTab === 'profile' ? 'active' : ''} 
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </li>
            <li 
              className={activeTab === 'settings' ? 'active' : ''} 
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h2>Your Dessert Bookings</h2>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Dessert</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map(booking => (
                    <tr key={booking._id}>
                      <td>{booking._id}</td>
                      <td>{booking.desertName}</td>
                      <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
                      <td>{booking.status || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'profile' && <Profile />}

        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  );
};

export default Dashboard;
