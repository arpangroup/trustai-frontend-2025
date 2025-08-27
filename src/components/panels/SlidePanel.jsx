import React from "react";
import "./SlidePanel.css";
import { FaChevronLeft } from "react-icons/fa";

const SlidePanel = ({ isOpen, onClose, title, children }) => {
  return (
    <div className={`slide-panel ${isOpen ? "open" : ""}`}>
      <div className="slide-panel-toolbar">
        <FaChevronLeft className="back-icon" onClick={onClose} />
        <span>{title}</span>
      </div>
      <div className="slide-panel-content">{children}</div>
    </div>
  );
};

export default SlidePanel;
