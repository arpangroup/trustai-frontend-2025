import React from 'react';
import './SoldStakeCard.css';

const SoldStakeCard = ({ order, onSell }) => {
  const { imageUrl: imgSrc, schemaTitle: title, reservedAmount, valuationDelta, handlingFee, returnRate} = order;
  //const price = (Number(reservedAmount) + Number(valuationDelta)).toFixed(2);
  const price = reservedAmount;

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
        <button className="buy-btn" onClick={onSell}>Sell</button>
      </div>
    </div>
  );
}


export default SoldStakeCard;