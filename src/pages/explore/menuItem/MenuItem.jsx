import React from "react";

export default function MenuItem({ active, children, onClick }) {
  return (
    <span
      className={`menu-item${active ? " active" : ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
