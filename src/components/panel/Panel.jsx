import React from "react";
import "./Panel.css";

const Panel = ({ title, value, type = "" }) => {
  return (
    <div className={`panel ${type}`}>
      <div className="panel-title">{title}</div>
      <div className="panel-value">{value}</div>
    </div>
  );
};

export default Panel;
