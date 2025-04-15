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
  Trophy,
  ClockIcon,
  BookAIcon,
  CreditCard
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css'; // Keep the original CSS import
import { useNavigate } from "react-router-dom";
import logoImg from "./Images/LOGO.jpg"

// Add additional CSS styles directly in the component
const specialButtonStyles = {
  // Special button styles
  specialButton: {
    background: 'linear-gradient(135deg, #4285F4, #34A853)',
    border: '1px solid #4285F4',
    boxShadow: '0 4px 8px rgba(66, 133, 244, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
  },
  specialButtonHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 12px rgba(66, 133, 244, 0.25)',
  },
  specialContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 0',
  },
  specialIconContainer: {
    background: 'rgba(255, 255, 255, 0.3)',
    padding: '10px',
    borderRadius: '50%',
    color: 'white',
    marginBottom: '8px',
  },
  specialTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: '1rem',
    textAlign: 'center',
    lineHeight: '1.3',
  },
  newBadge: {
    backgroundColor: '#FBBC05',
    color: '#202124',
    fontSize: '0.65rem',
    padding: '2px 6px',
    borderRadius: '12px',
    marginLeft: '6px',
    position: 'relative',
    top: '-2px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  pulsingDot: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '8px',
    height: '8px',
    backgroundColor: '#FBBC05',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
};
// Define keyframes animation as a separate style to be added to the component
const keyframesStyle = `
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 193, 7, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
  }
}
`;

const AdminDashboard = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
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
    { id: 7, title: 'Candidates(No Photo)', icon: <Users size={24} />, color: '#00BCD4' },
    { id: 8, title: 'Queries', icon: <HelpCircle size={24} />, color: '#F44336' },
    { id: 9, title: 'Upload Key-Answers', icon: <BookOpen size={24}/>, color: '#795548' },
    { id: 10, title: 'Winner Details', icon: <Trophy size={24}/>, color: '#607D8B' },
    { id: 11, title: 'Practice Test Details', icon: <ClockIcon size={24}/>, color: '#3949AB', special: true },
    { id: 12, title: 'PDF Syllabus Details', icon: <BookAIcon size={24}/>, color: '#3949AB', special: true },
    { id: 13, title: 'GST Invoice Download', icon: <CreditCard size={24}/>, color: '#3949AB', special: true },
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
        navigate("/candidatesnophoto");
        break;
      case 8:
        navigate("/concirns");
        break;
      case 9:
        navigate("/uploadqa");
        break;
      case 10:
        navigate("/winnerdetails");
        break;
      case 11:
        navigate("/practicedashboard");
        break;
      case 12:
        navigate("/pdfsyllabusdashboard");
        break;
      case 13:
        navigate("/gstinvoice");
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Add keyframes animation to document */}
      <style>{keyframesStyle}</style>
      
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center gap-3">
          <img src={logoImg} alt="Logo" className="brand-logo" style={{height:"70px", width:"70px"}} />
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
                style={{ 
                  '--button-color': button.color,
                  ...(button.special && {
                    ...specialButtonStyles.specialButton,
                    ...(hoveredButton === button.id && specialButtonStyles.specialButtonHover)
                  })
                }}
                onClick={() => handleButtonClick(button.id, button.title)}
                onMouseEnter={() => setHoveredButton(button.id)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                {button.special && <div style={specialButtonStyles.pulsingDot}></div>}
                
                <div className="button-content" style={button.special ? specialButtonStyles.specialContent : {}}>
                  <div className="icon-container" style={button.special ? specialButtonStyles.specialIconContainer : { color: button.color }}>
                    {button.icon}
                  </div>
                  <span className="button-title" style={button.special ? specialButtonStyles.specialTitle : {}}>
                    {button.title}
                    {button.special && <span style={specialButtonStyles.newBadge}>NEW</span>}
                  </span>
                </div>
                
                <div className="hover-effect" style={button.special ? { background: 'rgba(255, 255, 255, 0.3)' } : {}}></div>
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