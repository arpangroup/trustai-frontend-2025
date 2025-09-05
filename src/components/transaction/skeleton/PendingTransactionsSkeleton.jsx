import React from "react";
import "./PendingTransactionsSkeleton.css";

const PendingTransactionsSkeleton = () => {
  return (
    <div className="">
      <div className="recent-header">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-btn"></div>
      </div>

      <div className="recent-list">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="recent-item">
            <div className="recent-icon-group">
              <div className="skeleton skeleton-icon"></div>
              <div>
                <div className="skeleton skeleton-line short"></div>
                <div className="skeleton skeleton-line thinner"></div>
              </div>
            </div>
            <div className="skeleton skeleton-amount"></div>
          </div>
        ))}
      </div>

      <div className="recent-footer">
        <div className="skeleton skeleton-line short"></div>
        <div className="skeleton skeleton-line short"></div>
      </div>
    </div>
  );
};

export default PendingTransactionsSkeleton;
