import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import './NotificationCard.css';

export default function NotificationCard({ notification, onClick, onDelete }) {
  const { id, title, message, createdAt, viewed, image } = notification;

  return (
    <div
      className={`notification-card ${viewed ? 'viewed' : 'new'}`}
      onClick={() => onClick(id)}
    >
      <div className="notification-main">
        <div className="notification-text">
          <h3 className="notification-title">{title}</h3>
          <p className="notification-message">{message}</p>
        </div>
        <div className="notification-meta">
          <span className="notification-date">
            {new Date(createdAt).toLocaleString()}
          </span>
          <FiTrash2
            className="delete-icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent mark-as-read on delete
              onDelete(id);
            }}
            title="Delete"
          />
        </div>
      </div>
    </div>
  );
}
