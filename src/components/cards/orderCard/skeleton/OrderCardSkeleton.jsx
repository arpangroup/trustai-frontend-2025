import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./OrderCardSkeleton.css";

export default function OrderCardSkeleton({ cards = 8 }) {
  return (
    <SkeletonTheme baseColor="#e2e5e7" highlightColor="#f5f5f5">
      {Array(cards)
        .fill(0)
        .map((_, i) => (
          <div className="order-card-skeleton" key={i}>
            <div className="skeleton-top">
              <Skeleton width={150} height={14} />
              <Skeleton width={60} height={20} borderRadius={11} />
            </div>

            <div className="skeleton-date">
              <Skeleton width={100} height={12} />
            </div>

            <div className="skeleton-reserve">
              <Skeleton width={160} height={14} />
            </div>

            <div className="skeleton-nft-row">
              <div className="skeleton-nft-img">
                <Skeleton width={53} height={53} borderRadius={11} />
              </div>
              <div className="skeleton-nft-details">
                <Skeleton width={`80%`} height={14} style={{ marginBottom: '6px' }} />
                <Skeleton width={`50%`} height={14} />
              </div>
            </div>
          </div>
        ))}
    </SkeletonTheme>
  );
}
