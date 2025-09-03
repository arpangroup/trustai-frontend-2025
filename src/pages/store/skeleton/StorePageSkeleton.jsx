import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./StorePageSkeleton.css";

export default function StorePageSkeleton() {
  return (
    <div className="dashboard-skeleton">

      {/* Top Panels */}
      <div className="panel-row">
        <div className="panel-skeleton">
          <Skeleton width={120} height={14} style={{ marginBottom: "8px" }} />
          <Skeleton width={80} height={20} />
        </div>
        <div className="panel-skeleton">
          <Skeleton width={140} height={14} style={{ marginBottom: "8px" }} />
          <Skeleton width={90} height={20} />
        </div>
      </div>

      {/* Mid Panels */}
      <div className="panel-row">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div className="panel-mid-skeleton" key={i}>
              <Skeleton width={100} height={12} style={{ marginBottom: "6px" }} />
              <Skeleton width={60} height={16} />
            </div>
          ))}
      </div>

      {/* Tabs */}
      <div className="tabs tabs-panel">
        {[1, 2, 3].map((i) => (
          <div key={i} className="tab-skeleton"></div>
        ))}
      </div>

      {/* Tab Content - Orders */}
      <div className="tab-content">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-skeleton">
            <div className="skeleton-img"></div>
            <div className="skeleton-body">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line long"></div>
              <div className="skeleton-line medium"></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
