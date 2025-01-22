import React, { useState } from 'react';
import {
  BookOpen,
  LogOut,
  Plus,
  Calendar,
  Bell,
  FileText,
  Award,
  Users,
  HelpCircle,
  Trophy, // Added for winner details icon
  Delete,
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';
import { useNavigate } from "react-router-dom";
import logoImg from "./Images/LOGO.jpg"

const AdminDashboard = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setShowLogoutPopup(false);
    navigate("/");
  };

  const dashboardButtons = [
    { id: 1, title: 'Add Question', icon: <Plus size={24} />, color: '#4CAF50' },
    { id: 2, title: 'Add Date & Time', icon: <Calendar size={24} />, color: '#2196F3' },
    { id: 3, title: 'Notification', icon: <Bell size={24} />, color: '#FF9800' },
    { id: 4, title: 'Upload Syllabus', icon: <FileText size={24} />, color: '#9C27B0' },
    { id: 5, title: 'Results', icon: <Award size={24} />, color: '#E91E63' },
    { id: 6, title: 'Candidates', icon: <Users size={24} />, color: '#00BCD4' },
    { id: 7, title: 'Queries', icon: <HelpCircle size={24} />, color: '#F44336' },
    { id: 8, title: 'Upload Key-Answers', icon: <BookOpen size={24}/>, color: '#795548' },
    { id: 9, title: 'Winner Details', icon: <Trophy size={24}/>, color: '#607D8B' } // Added new button
  ];

  const handleButtonClick = (id, title) => {
    setActiveButton(id);
    console.log(`Button clicked: ${title}`);
    switch (id) {
      case 1:
        navigate("/questions");
        break;
      case 2:
        navigate("/datentime");
        break;
      case 3:
        navigate("/notification");
        break;
      case 4:
        navigate("/syllabus");
        break;
      case 5:
        navigate("/examresults");
        break;
      case 6:
        navigate("/candidates");
        break;
      case 7:
        navigate("/concirns");
        break;
      case 8:
        navigate("/uploadqa");
        break;
      case 9:
        navigate("/winnerdetails"); // Added new route
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center gap-3">
          <img src={logoImg} alt="Logo" className="brand-logo"style={{height:"70px", width:"70px"}} />
            <span className="brand-text">ARN Private <br></br><span>Exam Conduct</span>
            </span>
          </div>
          <span className="dashboard-title" style={{marginRight:"100px"}}>Admin Dashboard</span>
          <button className="logout-btn" onClick={() => setShowLogoutPopup(true)}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row g-4">
          {dashboardButtons.map((button) => (
            <div key={button.id} className="col-12 col-md-6 col-lg-3">
              <button
                className={`dashboard-button ${activeButton === button.id ? 'active' : ''}`}
                style={{ '--button-color': button.color }}
                onClick={() => handleButtonClick(button.id, button.title)}
              >
                <div className="button-content">
                  <div className="icon-container" style={{ color: button.color }}>
                    {button.icon}
                  </div>
                  <span className="button-title">{button.title}</span>
                </div>
                <div className="hover-effect"></div>
                {activeButton === button.id && <div className="active-pulse"></div>}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="logout-popup-overlay">
          <div className="logout-popup">
            <h3>Are you sure you want to logout?</h3>
            <div className="popup-buttons">
              <button className="btn btn-danger" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button className="btn btn-secondary" onClick={() => setShowLogoutPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;