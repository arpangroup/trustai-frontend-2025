import React from "react";
import "./StatPanel.css";

export default function StatPanel({ items }) {
  return (
    <div className="panel">
      {items.map((item, index) => (
        <div key={index} className="panel-item">
          <div className="panel-header">{item.label}</div>
          <div className="panel-subtext">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
