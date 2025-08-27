import React from "react";
import "./Header.css";

import Image1 from '../../assets/bids1.png';

export default function Header() {
  return (
    <div className="header header-main">
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
