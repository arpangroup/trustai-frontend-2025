import React from 'react';
import './SoldStakeCard.css';

export default function SoldStakeCard({ imgSrc, title, price, onBuy }) {
  return (
    <div className="nft-card">
      <img src={imgSrc} alt={title} />
      <div className="nft-info">
        <div className="nft-title">{title}</div>
        <div className="nft-price">
          <span className="usdt-icon"></span>
          {price} USDT
          <span className="price-trend">↗</span>
        </div>
        <button className="buy-btn" onClick={onBuy}>Sell</button>
      </div>
    </div>
  );
}
