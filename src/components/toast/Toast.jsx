import React, { useEffect } from "react";
import "./Toast.css";

export default function Toast({ message, type = "info", duration = 2000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
}
