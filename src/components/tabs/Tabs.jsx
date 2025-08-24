import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "all", label: "All" },
    { id: "art", label: "Art" },
    { id: "celeb", label: "Celebrities" },
    { id: "gaming", label: "Gaming" },
  ];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <span
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
