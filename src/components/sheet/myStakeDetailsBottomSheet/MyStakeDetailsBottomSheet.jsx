import React from 'react';
import './MyStakeDetailsBottomSheet.css';

import BottomSheet from "../bottomsheet/BottomSheet";

export default function MyStakeDetailsBottomSheet({ isOpen, onClose, ...stake }) {
  const {
    schemaName,
    imageUrl,
    investedAmount,
    roiValue,
    expectedReturn,
    totalEarningPotential,
    earlyExitPenalty,
    nextReturnAmount,
    subscribedAt,
    nextPayoutDate,
    maturityAt,
    payoutFrequencyLabel,
    investmentStatus,
    currencyCode,
    daysRemaining,
  } = stake;

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Stake Summary"
      footer={
        <button className="bottomsheet-close-btn" onClick={onClose}>
          Close
        </button>
      }
    >
      <div className="image-block">
        <img src={imageUrl} alt={schemaName} className="nft-thumbnail" />
        <h3>{schemaName}</h3>
      </div>

      <div className="info-section">
        <div className="info-group"><span>Invested Amount:</span><span>{investedAmount} {currencyCode}</span></div>
        <div className="info-group"><span>ROI:</span><span>{roiValue}%</span></div>
        <div className="info-group"><span>Expected Return:</span><span>{expectedReturn} {currencyCode}</span></div>
        <div className="info-group"><span>Total Earning Potential:</span><span>{totalEarningPotential} {currencyCode}</span></div>
        <div className="info-group"><span>Next Return:</span><span>{nextReturnAmount} {currencyCode}</span></div>
        <div className="info-group"><span>Early Exit Penalty:</span><span>{earlyExitPenalty} {currencyCode}</span></div>
        <div className="info-group"><span>Subscribed At:</span><span>{new Date(subscribedAt).toLocaleString()}</span></div>
        <div className="info-group"><span>Next Payout:</span><span>{new Date(nextPayoutDate).toLocaleString()}</span></div>
        <div className="info-group"><span>Maturity Date:</span><span>{new Date(maturityAt).toLocaleString()}</span></div>
        <div className="info-group"><span>Payout Frequency:</span><span>{payoutFrequencyLabel}</span></div>
        <div className="info-group"><span>Status:</span><span>{investmentStatus}</span></div>
        <div className="info-group"><span>Days Remaining:</span><span>{daysRemaining}</span></div>
      </div>
    </BottomSheet>
  );

}
