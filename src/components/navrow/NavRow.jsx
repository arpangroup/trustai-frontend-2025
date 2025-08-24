import React from "react";
import { useNavigate } from 'react-router-dom';
import "./NavRow.css";

export default function NavRow({ navButtons }) {
  const navigate = useNavigate();
  const handleClick = (link) => {
    if (link) {
      navigate(link);
    }
  };


  return (
    <div className="nav-row">
      {navButtons.map(({ icon, label, link }, i) => (
        <div className="nav-btn" key={i} role="button" tabIndex={0} onClick={() => handleClick(link)}>
          <div className="nav-btn-inner">
            <span className="nav-icon">{icon}</span>
          </div>
          <div className="nav-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
