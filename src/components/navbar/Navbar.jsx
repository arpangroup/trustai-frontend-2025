import React,{ useState, useEffect } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine, RiHome2Line, RiInformationLine, RiSettings3Line, RiNotificationLine, RiNotification3Line } from 'react-icons/ri';
import LogoIcon from '../../assets/logo.png'
import {  Link, useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from '../../context/NotificationContext';

const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
     <p>My Items</p>
    
  </>
 )

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(3);
  const { unreadCount } = useNotifications();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    setUser(false);
    navigate('/login');
  };

  const handleLogin = () => {
    setUser(true);
    navigate('/');
  };

  // Redirect to /login if not logged in and not already on /login
  /* useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [user, location.pathname, navigate]); */

  // Hide Navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot') {
    return null;
  }

  return (
    <>
      <div className="navbar">
        {/* <button className="menu-btn" onClick={toggleSidebar}>
          &#9776;
        </button> */}
        <div className="logo">
          <img
            src={LogoIcon}
            alt="App Logo" />
            <Link to="/" className="logo-title">TrustAI</Link>
        </div>
        
        <div className="notification-icon">
          <Link to="/alerts" className="notification-icon-wrapper">
            <RiNotification3Line size={28} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={LogoIcon} alt="Logo" className="sidebar-logo" />
          <span className="sidebar-title">TreasureApp</span>
        </div>

        {/* <hr className="sidebar-separator" /> */}

        <ul className="sidebar-menu">
           <li className={isActive("/") ? "active" : ""}>
              <Link to="/">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Explore</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/earn") ? "active" : ""}>
              <Link to="/stake">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Earn</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/reserve") ? "active" : ""}>
              <Link to="/stake">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Reserve</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/assets") ? "active" : ""}>
              <Link to="/stake">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Assets</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/create") ? "active" : ""}>
              <Link to="/create">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Create NFT</span>
                </div>
              </Link>
            </li>

            <hr className="sidebar-separator" />
            

            
            
            <li className={isActive("/alerts") ? "active" : ""}>
              <Link to="/alerts">
                <div className="menu-content">
                  <RiNotificationLine className="sidebar-icon" />
                  <span className="menu-label">Alerts</span>
                </div>
                <span className="badge">5</span>
              </Link>
            </li>

             <li className={isActive("/tree") ? "active" : ""}>
              <Link to="/level">
                <div className="menu-content">
                  <RiNotificationLine className="sidebar-icon" />
                  <span className="menu-label">Level</span>
                </div>
                <span className="badge">5</span>
              </Link>
            </li>

            <hr className="sidebar-separator" />

             <li className={isActive("/settings") ? "active" : ""}>
              <Link to="/settings">
                <div className="menu-content">
                  <RiSettings3Line className="sidebar-icon" />
                  <span className="menu-label">Settings</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/about") ? "active" : ""}>
              <Link to="/about">
                <div className="menu-content">
                  <RiInformationLine className="sidebar-icon" />
                  <span className="menu-label">About</span>
                </div>
              </Link>
            </li>

          






          {/* <li className={isActive("/") ? "active" : ""}>
            <RiMenu3Line className="sidebar-icon" />
            <Link to="/">Home</Link>
          </li>
          <li>
            <RiMenu3Line className="sidebar-icon" />
            <Link to="/about">About</Link>
          </li>
          <li>
            <RiMenu3Line className="sidebar-icon" />
            <Link to="/contact">Contact</Link>
          </li> */}
        </ul>

        <hr className="sidebar-separator" />

        <div className="sidebar-footer">
          <p>&copy; 2025 TreasureApp</p>
        </div>
      </div>

      {/* {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>} */}
    </>
  );
};


export default Navbar
