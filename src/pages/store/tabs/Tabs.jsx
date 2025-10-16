import React from "react";
import './Tabs.css';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs tabs-panel">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onTabChange(tab.key)}
          style={tab.style}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
