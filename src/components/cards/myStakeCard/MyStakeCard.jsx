import React from "react";
import "./MyStakeCard.css";
import { CURRENCY_SYMBOL, CURRENCY_UNIT } from "../../../constants/config";
import { formatDateShort } from "../../../constants/dateFormatter";
import KeyValuePair from "../../keyValuePair/KeyValuePair";
const defaultImage = "http://localhost:8080/api/v1/files/download/stake_1.png";

export default function MyStakeCard({
  imageUrl = defaultImage,
  schemaName = "Untitled Stake",
  investedAmount = 0,
  currency = CURRENCY_UNIT,
  roiValue = 0,
  roiType = "PERCENTAGE",
  remainingPeriods = 0,
  payoutFrequencyLabel = "Daily",
  perPeriodProfit = 0,
  receivedReturn = 0,
  expectedReturn = 0,
  totalEarningPotential = 0,
  nextReturnAmount = 0,
  nextPayoutDate = "-",
  onDetailsClick = () => {},
}) {
  const formatCurrency = (value) => `${value} ${currency}`;

  return (
    <div className="stake-card">
      <div className="stake-card__top-row">
        <img
          src={imageUrl}
          alt={schemaName}
          className="stake-card__image"
          loading="lazy"
          onError={(e) => (e.target.src = defaultImage)}
        />
        <div className="stake-card__text-block">
          <div className="stake-card__stake-name">{schemaName}</div>
          <div className="stake-card__col2">
            <span className="stake-card__label">Stake Value </span>
            <span className="stake-card__value">{formatCurrency(investedAmount)}</span>
          </div>
          <div className="stake-card__col2">
            <span className="stake-card__label">ROI</span>
            <span className="stake-card__value">
              {roiValue}
              {roiType === 'PERCENTAGE' ? '%' : CURRENCY_SYMBOL}
            </span>
           </div>
        </div>
      </div>

      <div className="stake-card__divider" />

      <div className="stake-card__bottom-row">    
        <KeyValuePair label="Remaining" value={`${remainingPeriods} ${payoutFrequencyLabel === "Daily" ? "days" : payoutFrequencyLabel}`}/>
        {/* <KeyValuePair label="Per Period Profit" value={formatCurrency(perPeriodProfit)} /> */}
        {/* <KeyValuePair label="Expected Return" value={formatCurrency(expectedReturn)} /> */}
        {/* <KeyValuePair label="Received Return" value={formatCurrency(receivedReturn)} /> */}
        {/* <KeyValuePair label="Next Return Amount" value={formatCurrency(nextReturnAmount)} /> */}
        {/* <KeyValuePair label="Next Payout Date" value={formatDateShort(nextPayoutDate)} /> */}
         <KeyValuePair label="Total Earning Potential" value={formatCurrency(totalEarningPotential)}/>
      </div>

      <button className="stake-card__button" onClick={onDetailsClick}>
        Details
      </button>
    </div>
  );


}
