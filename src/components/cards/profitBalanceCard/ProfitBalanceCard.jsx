import React from 'react';
import './ProfitBalanceCard.css';

const ProfitBalanceCard = ({ amount, currency = 'USD', label = 'Today' }) => {
  const isPositive = parseFloat(amount) >= 0;

  return (
    <div className="profit-card">
      <div className="profit-header">
        <span className="profit-label">{label}</span>
      </div>
      <div className={`profit-amount ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : '-'}
        {currency} {Math.abs(amount).toLocaleString()}
      </div>
    </div>
  );
};

export default ProfitBalanceCard;
