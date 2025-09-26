import React from "react";
import "./TopCollectionList.css";

export default function TopCollectionList({ collections, onMoreClick }) {  
  const imageUrl = "https://picsum.photos/200/300";
  const avatar = "https://picsum.photos/200/300";
  const bgColors = ['#FFD700', '#FF69B4', '#87CEFA', '#90EE90', '#FFA07A', '#b5beca', '#d19b53', '#c2bbd2', '#ffbb4c', '#f5831f'];

  // Enhance collections with random rankBg if not already provided
  const collectionsWithBg = collections.map((item) => ({
    ...item,
    rankBg: item.rankBg || bgColors[Math.floor(Math.random() * bgColors.length)],
  }));

  return (
    <div className="section" style={{ background: "#fff" }}>
      <div className="section-title">
        Top collections
        <button 
            className="more-button" 
            onClick={onMoreClick} 
            aria-label="More collections"
            type="button"
            >
            More
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="chevron-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width="18"
                height="18"
                aria-hidden="true"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            </button>
      </div>
      <div className="collection-list">
        {collectionsWithBg.map(({ rank, rankBg, imgSrc, alt, title, badge, value, change }, i) => (
          <div className="collection-item" key={i}>
            <div className="collection-rank" style={{ background: rankBg }}>
              {i+1}
            </div>
            <img src={imgSrc || imageUrl} className="collection-avatar" alt={alt} />
            <div className="collection-details">
              <div className="collection-title">{title}</div>
              <div className="collection-floor">{badge}</div>
            </div>
            <div className="collection-value">{value}</div>
            <div className="collection-change">{change}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
