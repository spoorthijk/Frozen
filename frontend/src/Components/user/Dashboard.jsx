import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import './dashboard.css';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Decode the token to extract the user ID.
      const decoded = jwtDecode(token);
      const userId = decoded._id || decoded.id; // Adjust based on your token payload

      try {
        const response = await axios.get(`http://localhost:8000/api/v1/bookings/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setBookings(response.data.data);
        } else {
          console.error("Error fetching bookings:", response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (activeTab === 'bookings') {
      fetchBookings();
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Adjust the URL as needed.
  };

  const confirmLogout = () => {
    setShowModal(true);
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

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
        <div className="logout-container">
          <button onClick={confirmLogout} className="btn logout-btn">Logout</button>
        </div>
      </aside>
      <main className="dashboard-content">
        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h2>Your Dessert Bookings</h2>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>User Email</th>
                  <th>Dessert</th>
                  <th>Full Name</th>
                  <th>Quantity</th>
                  <th>Phone</th>
                  <th>Order Date</th>
                  <th>Order Time</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map(booking => (
                    <tr key={booking._id}>
                      <td>{booking.userEmail}</td>
                      <td>{booking.desertName}</td>
                      <td>{booking.fullName}</td>
                      <td>{booking.quantity}</td>
                      <td>{booking.phone}</td>
                      <td>{new Date(booking.orderDate).toLocaleDateString()}</td>
                      <td>{booking.orderTime || 'N/A'}</td>
                      <td>{new Date(booking.createdAt).toLocaleString()}</td>
                      <td>{new Date(booking.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'settings' && <Settings />}
      </main>

      {showModal && (
       <div className={`modal-overlays ${showModal ? "show" : ""}`}>
          <div className="modal-contents">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button onClick={handleLogout} className="btn confirm-btn">Yes</button>
              <button onClick={cancelLogout} className="btn cancel-btn">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
