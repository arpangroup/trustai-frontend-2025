import React from "react";
import "./Panel.css";
import { Link } from "react-router-dom";

const COLORS = [
  "#55f0e0", // Aqua
  "#a889ff", // Light Purple
  "#ffb86c", // Peach
  "#8be9fd", // Sky Blue
  "#f58cba", // Pink
  "#f1fa8c", // Yellow
  "#ff6b6b", // Coral Red
  "#50fa7b", // Green
];

export default function Panel({ title, items, actionText = "View All", onActionClick }) {  

  return (
    <div className="aj-panel" data-aj-panel>
      <div className="aj-panel__header">
        <h2 className="aj-panel__title">{title}</h2>
        {actionText && (
          <div className="aj-panel__action" onClick={onActionClick}>
            {actionText}
            <span className="aj-panel__chevron">›</span>
          </div>
        )}
      </div>

      <div className="aj-panel__grid">
        {items.map((it, idx) => {
          const color = COLORS[idx % COLORS.length]; // Rotate through the color list
           const content = (
            <div className="aj-card">
              <div className="aj-value" style={{ color }}>{it.label}</div>
              <div className="aj-label">{it.value}</div>
            </div>
          );
          return (
            <div key={idx}>
              {it.link ? <Link to={it.link}>{content}</Link> : content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
