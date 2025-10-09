import React from "react";
import "./ExplorePageSkeleton.css";

export default function ExplorePageSkeleton() {
  return (
    <div className="explore-skeleton">
      {/* Header Menu Skeleton */}
      <div className="header-menu-skeleton">
        <div className="menu-item-skeleton"></div>
        <div className="menu-item-skeleton"></div>
        <div className="menu-item-skeleton"></div>
      </div>

      {/* Tab Content Area Skeleton */}
      <div className="tab-content-skeleton">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="stake-card-skeleton">
            <div className="image-skeleton"></div>
            <div className="text-block-skeleton">
              <div className="line-skeleton short"></div>
              <div className="line-skeleton"></div>
              <div className="line-skeleton"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
