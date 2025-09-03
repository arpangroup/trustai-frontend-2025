import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./StatPanelSkeleton.css";

export default function StatPanelSkeleton({ items = 4, panels = 2 }) {
  return (
    <div className="panel-skeleton-wrapper">
      {Array(panels).fill(0).map((_, panelIndex) => (
        <div key={panelIndex} className="panel-skeleton">
          {Array(items).fill(0).map((_, itemIndex) => (
            <div key={itemIndex} className="panel-item-skeleton">
              <Skeleton width={60} height={18} style={{ marginBottom: "6px" }} />
              <Skeleton width={40} height={12} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
