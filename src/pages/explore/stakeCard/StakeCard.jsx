import React from 'react';
import './StakeCard.css';

export default function StakeCard({ title, level, img, status, info, actionLabel, onAction, cardImgStyle }) {
  return (
    <div className="stake-card">
      <div className="stake-card-header">
        <span className="stake-title">{title}</span>
        {level && <span className="stake-level">{level}</span>}
      </div>
      <div className="stake-card-img" style={cardImgStyle}>{img}</div>
      {status && <span className="status">{status}</span>}
      <div className="stake-info">{info}</div>
      {actionLabel && (
        <button className="stake-btn" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
