import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./TabsSkeleton.css";

export default function TabsSkeleton({ count = 3, cards = 2 }) {
  return (
    <div className="tabs-skeleton-wrapper">
      {/* Tabs header skeleton */}
      <div className="tabs-skeleton">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="tab-skeleton">
              <Skeleton width={80} height={20} />
            </div>
          ))}
      </div>

      {/* Tab content skeleton */}
      <div className="tab-content-skeleton">
        {Array(cards)
          .fill(0)
          .map((_, i) => (
            <div className="card-skeleton" key={i}>
              <Skeleton height={18} width={`60%`} style={{ marginBottom: "10px" }} />
              <Skeleton height={14} width={`80%`} style={{ marginBottom: "6px" }} />
              <Skeleton height={14} width={`40%`} />
            </div>
          ))}
      </div>
    </div>
  );
}
