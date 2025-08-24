import React from "react";
import "./NavRow.css";

export default function NavRow({ navButtons }) {
  return (
    <div className="nav-row">
      {navButtons.map(({ icon, label }, i) => (
        <div className="nav-btn" key={i} role="button" tabIndex={0}>
          <div className="nav-btn-inner">
            <span className="nav-icon">{icon}</span>
          </div>
          <div className="nav-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
