import React from "react";
import "./BottomNav.css";
import { useLocation, useNavigate } from "react-router-dom";


import { MdHome, MdStorefront } from "react-icons/md";
import { FaFileAlt, FaUser } from "react-icons/fa";


const bottomNavItems = [
  { icon: <MdHome />, label: "Home", link: "/" },
  { icon: <MdStorefront />, label: "Store", link: "/store" },
  { icon: <FaFileAlt />, label: "Wallet", link: "/assets" },
  { icon: <FaUser />, label: "Profile", link: "/profile" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="bottom-nav">
      {bottomNavItems.map(({ icon, label, link }, i) => (
        <div className="bottom-nav-item" key={i} role="button" tabIndex={0} onClick={() => handleClick(link)}>
          <span className="bottom-nav-icon">{icon}</span>
          <span className="bottom-nav-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
