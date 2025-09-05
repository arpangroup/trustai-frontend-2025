import React from "react";
import "./WalletPageSkeleton.css";

const WalletPageSkeleton = () => {
    return (
        <div style={{ padding: "16px" }}>
            {/* Balance Section */}
            <section className="balance-section">
                <div className="skeleton skeleton-text skeleton-label"></div>
                <div className="skeleton skeleton-text skeleton-balance"></div>
            </section>

            {/* Cashback Banner Skeleton */}
            <div className="skeleton-banner">
                <div className="skeleton skeleton-icon"></div>
                <div style={{ flex: 1 }}>
                    <div className="skeleton skeleton-text skeleton-banner-title"></div>
                    <div className="skeleton skeleton-text skeleton-banner-sub"></div>
                </div>
            </div>

            {/* Services Card Skeleton */}
            <div className="skeleton-card">
                <div className="skeleton-card-header">
                    <div className="skeleton skeleton-text skeleton-title"></div>
                    <div className="skeleton skeleton-pill"></div>
                </div>

                {/* Icons Grid Skeleton */}
                <div className="skeleton-icons-row">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div className="skeleton-icon-card" key={i}>
                            <div className="skeleton skeleton-circle"></div>
                            <div className="skeleton skeleton-text skeleton-icon-label"></div>
                        </div>
                    ))}
                </div>

                <div className="skeleton-icons-row">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div className="skeleton-icon-card" key={i}>
                            <div className="skeleton skeleton-circle"></div>
                            <div className="skeleton skeleton-text skeleton-icon-label"></div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="skeleton-card">
                <div className="skeleton-card-header">
                    <div className="skeleton skeleton-text skeleton-title"></div>
                    <div className="skeleton skeleton-pill"></div>
                </div>


                <div className="skeleton-banner">
                    <div className="skeleton skeleton-icon"></div>
                    <div style={{ flex: 1 }}>
                        <div className="skeleton skeleton-text skeleton-banner-title"></div>
                        <div className="skeleton skeleton-text skeleton-banner-sub"></div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default WalletPageSkeleton;
