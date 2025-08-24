import React, { useState } from "react";
import "./Tabs.css";

export default function Tabs({ tabs }) {
  // tabs: array of { id, label, content }
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const ActiveTabContent = tabs.find((tab) => tab.id === activeTab)?.Component;

  return (
    <div className="tabs-wrapper">
      {/* Tab Titles - generic class name */}
      <div className="tab-titles-row" role="tablist" aria-label="Tabs navigation">
        {tabs.map(({ id, label }) => (
          <div
            key={id}
            role="tab"
            tabIndex={activeTab === id ? 0 : -1}
            aria-selected={activeTab === id}
            className={`tab-title${activeTab === id ? " active" : ""}`}
            onClick={() => setActiveTab(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveTab(id);
              }
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Tab Content - generic class name */}
      <div className="tab-content-container">        
        {ActiveTabContent && <ActiveTabContent/>}
      </div>
    </div>
  );
}
