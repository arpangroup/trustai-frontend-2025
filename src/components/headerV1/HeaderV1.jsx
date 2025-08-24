import React from "react";
import "./HeaderV1.css";

import Image1 from '../../assets/bids1.png';

export default function HeaderV1() {
  return (
    <div className="header">
      <div className="header-content">
        <img src={Image1} className="avatar" alt="User" />
        <div className="welcome-text">
          <div className="welcome">Welcome to TrustAI</div>
          <div className="signin">Click to sign in</div>
        </div>
      </div>
      <div className="header-icons">
        <div className="icon-btn" aria-label="Notifications" role="button">
          🔔
        </div>
        <div className="icon-btn" aria-label="Menu" role="button">
          ☰
        </div>
      </div>
    </div>
  );
}
