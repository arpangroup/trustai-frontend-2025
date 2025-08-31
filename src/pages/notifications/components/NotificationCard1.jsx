import React from 'react';
import './NotificationCard1.css';

export default function NotificationCard({ notification, onMarkViewed, onDelete }) {
  const { id, title, message, createdAt, viewed } = notification;

  return (
    <div className={`notification-card ${viewed ? 'viewed' : ''}`}>
      <div className="notification-content">
        <div className="notification-header">
          <h3 className="notification-title">{title}</h3>
          <span className="notification-date">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
        <p className="notification-message">{message}</p>
      </div>
      <div className="notification-actions">
        {!viewed && (
          <button onClick={() => onMarkViewed(id)}>Mark as Read</button>
        )}
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}
