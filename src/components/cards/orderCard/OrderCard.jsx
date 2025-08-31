import React from "react";
import "./OrderCard.css";

const formatOrderNo = (reservedAt, reservationId) => {
  const date = new Date(reservedAt);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const paddedId = String(reservationId).padStart(4, '0');
  return `TRST${yyyy}${mm}${dd}${paddedId}`;
};


const OrderCard = ({ order, currency }) => {
  const {
    reservationId, 
    schemaTitle: itemName, 
    imageUrl, 
    reservedAmount: itemPrice,
    reservedAt: createdAt, 
    expiryAt: drawDate, 
    incomeEarned,
    currencyCode,
    status = 'won'
  } = order;
  const orderNo = formatOrderNo(createdAt, reservationId);

  const estimatedAmount = "50-1000";

  return (
    <div className="order-card">
      <div className="order-top">
        <div className="order-number">
          Order Number:
          <span style={{ display: 'block' }}>{orderNo}</span>
        </div>
        <div className="order-status">{status}</div>
      </div>
      <div className="order-date">Draw Date: {drawDate}</div>
      <div className="order-reserve">
        Reservation Amount{" "}
        <span style={{ color: "#47cc96" }}>🪙 {itemPrice}</span>
      </div>
      <div className="nft-row">
        <img
          className="nft-img"
          src={imageUrl}
          alt={itemName}
          loading="lazy"
        />
        <div className="nft-details">
          <div className="nft-title">{itemName}</div>
          <div className="nft-price">
            Price <span className="nft-currency">🪙</span> {itemPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
