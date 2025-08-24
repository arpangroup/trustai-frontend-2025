import React from "react";

const NavRow = ({ items }) => {
  return (
    <div className="nav-row">
      {items.map((item, idx) => (
        <button key={idx} className="nav-item">
          {item}
        </button>
      ))}
    </div>
  );
};

export default NavRow;
