import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/styles.css";
import NavBar from '../components/NavBar';

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="icon-button">🔗</button>
        <button className="icon-button">⚙️</button>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-image">
          <img
            src="/user.png" // Replace with actual image URL
            alt="Profile"
          />
        </div>
        <h2 className="profile-name">Alice Nielsen</h2>
      </div>

      {/* Options List */}
      <div className="profile-options">
        <div
          className="option"
          onClick={() => navigate("/saved")} // Navigate to SavedRecipesPage
        >
          <span className="option-icon">🔖</span>
          <span className="option-text">Saved recipes</span>
          <span className="option-arrow">➔</span>
        </div>
        <div className="option">
          <span className="option-icon">⚙️</span>
          <span className="option-text">Preferences</span>
          <span className="option-arrow">➔</span>
        </div>
        <div className="option">
          <span className="option-icon">📩</span>
          <span className="option-text">Feedback & Support</span>
          <span className="option-arrow">➔</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button">Log Out</button>
      </div>
      <NavBar />
    </div>
  );
};

export default ProfilePage;
