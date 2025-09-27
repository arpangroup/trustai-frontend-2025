import React from "react";
import "./TransactionHistorySkeleton.css";

const TransactionHistorySkeleton = () => {
  return (
    <div className="" style={{padding: '0px', margin: '0px'}}>
      
      <ul className="history-list" style={{padding: '0'}}>
        {[...Array(5)].map((_, index) => (
          <li key={index} className="history-item">
            <div>
              <div className="skeleton skeleton-line short"></div>
              <div className="skeleton skeleton-line thinner"></div>
            </div>
            <div className="right-block">
              <div className="skeleton skeleton-amount"></div>
              <div className="skeleton skeleton-txn"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistorySkeleton;
