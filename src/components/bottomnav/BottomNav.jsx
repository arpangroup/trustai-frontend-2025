import React from "react";
import "./BottomNav.css";

const bottomNavItems = [
  { icon: "🏠", label: "Home" },
  { icon: "⭐", label: "Reserve" },
  { icon: "📄", label: "Assets" },
  { icon: "👤", label: "My" },
];

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      {bottomNavItems.map(({ icon, label }, i) => (
        <div className="bottom-nav-item" key={i} role="button" tabIndex={0}>
          <span className="bottom-nav-icon">{icon}</span>
          <span className="bottom-nav-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
