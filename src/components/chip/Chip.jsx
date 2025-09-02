import React from "react";
import "./Chip.css";

export default function Chip({ label, active = false, onClick }) {
  return (
    <button
      className={`chip ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
