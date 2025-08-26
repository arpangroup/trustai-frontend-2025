import React, { useEffect, useRef } from "react";
import './Tabs.css';

export default function Tabs({ tabs, activeTab, onTabChange }) {
  const highlightRef = useRef();
  const tabRefs = useRef([]);
  useEffect(() => {
    const idx = tabs.findIndex(tab => tab.key === activeTab);
    if (highlightRef.current && tabRefs.current[idx]) {
      const node = tabRefs.current[idx];
      highlightRef.current.style.width = node.offsetWidth + "px";
      highlightRef.current.style.left = node.offsetLeft + "px";
    }
  }, [activeTab, tabs]);


  return (
      <div className="tab-navs">
        <div className="tab-highlight" ref={highlightRef}></div>
        {tabs.map((tab, idx) => (
          <button
            key={tab.key}
            ref={el => (tabRefs.current[idx] = el)}
            id={tab.id}
            className={`tab${activeTab === tab.key ? " active" : ""}`}  
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
  );
}
