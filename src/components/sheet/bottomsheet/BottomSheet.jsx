import React from "react";
import "./BottomSheet.css";

export default function BottomSheet({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer 
}) {
  if (!isOpen) return null;

  return (
    <div className="bottomsheet-overlay" onClick={onClose}>
      <div 
        className="bottomsheet-container" 
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        {/* Header */}
        <div className="bottomsheet-header">
          {title && <h2>{title}</h2>}
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="bottomsheet-body">{children}</div>

        {/* Footer */}
        {footer && <div className="bottomsheet-footer">{footer}</div>}
      </div>
    </div>
  );
}
