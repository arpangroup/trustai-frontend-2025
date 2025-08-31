import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './Header.css';
import { AuthContext } from "../../context/AuthContext";

import Image1 from '../../assets/bids1.png';
import { useNotifications } from "../../context/NotificationContext";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [notificationCount, setNotificationCount] = useState(3);
  const { unreadCount } = useNotifications();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useContext(AuthContext);
  
  const handleSignInClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

  return (
    <div className="header header-main">
      <div className="header-content" onClick={handleSignInClick} style={{ cursor: "pointer" }}>
        <img src={Image1} className="avatar" alt="User" />
        <div className="welcome-text">
          <div className="welcome">Welcome to TrustAI</div>
          <div className="signin">
            {isAuthenticated && user?.username ? `Hello, ${user.username}` : "Click to sign in"}
          </div>
        </div>
      </div>
      <div className="header-icons">



        <div onClick={() => navigate('/login')} style={{position: 'relative', cursor: 'pointer'}}>          
          <div className="icon-btn" aria-label="Notifications" role="button">
            🔔
          </div>
           {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
        </div>
        


        <div onClick={() => setMenuOpen(!menuOpen)} className="icon-btn" aria-label="Menu" role="button" style={{cursor: 'pointer'}}>
          ☰
        </div>


        {isAuthenticated && (
          <div className={`menu-dialog ${menuOpen ? 'show' : ''}`}>
          <div className="menu-item"><i>🌍</i><span>Language</span></div>
          
          {/* WhatsApp Support */}
          <div className="menu-item" onClick={() => {
            window.open("https://wa.me/919876543210", "_blank"); // Replace with real number
            setMenuOpen(false);
          }}>
            <i>💬</i><span>Support</span>
          </div>


          {/* Telegram Link */}
          <div className="menu-item" onClick={() => {
            window.open("https://t.me/your_username", "_blank"); // Replace with real username
            setMenuOpen(false);
          }}>
            <i>📱</i><span>Telegram</span>
          </div>


          {/* Logout */}
          <div className="menu-item" onClick={() => {
            logout();
            setMenuOpen(false);
            navigate("/login");
          }}><i>🚪</i><span>Logout</span></div>

        </div>
        )}


      </div>
    </div>
  );
}
