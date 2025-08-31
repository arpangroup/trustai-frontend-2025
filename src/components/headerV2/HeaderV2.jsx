import React, { useEffect, useRef, useState } from "react";

import './HeaderV2.css';
import { FaRegBell } from "react-icons/fa";
import { FaEllipsisV } from 'react-icons/fa';
import {RiNotification3Line} from 'react-icons/ri';
import { useContext } from "react";
import { useNotifications } from '../../context/NotificationContext';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 

const HeaderV2 = () => {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(3);
  const { unreadCount } = useNotifications();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useContext(AuthContext);

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
    <div className="headerWhite">
      <div className="logo" onClick={() => window.location.href = '/'}>
        <div className="logoIcon"></div>
        <div className="logoText">
          Trust<span style={{ color: "#46dbff" }}>AI</span>
        </div>
      </div>

      <div className="headerTitle">Reserve</div>

      <div className="headerIcons">
        {/* Alarm Icon */}
        <div className="notification-icon">
          <Link to="/notifications" className="notification-icon-wrapper" style={{textDecoration: 'none'}}>
            <FaRegBell size={24}/>
            {/* <RiNotification3Line size={28} /> */}
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </Link>
        </div>
       
        {/* More Vert Icon */}
         <div onClick={() => setMenuOpen(!menuOpen)} className="menu-trigger">
          <FaEllipsisV size={20}/>
        </div>

        
        {/* MENU DROPDOWN */}
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

      </div>
    </div>
  );
};

export default HeaderV2;
