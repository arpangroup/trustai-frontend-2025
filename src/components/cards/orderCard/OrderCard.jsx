import React from "react";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <div className="order-top">
        <div className="order-number">
          Order Number:
          <span style={{ display: 'block' }}>{order.number}</span>
        </div>
        <div className="order-status">{order.status}</div>
      </div>
      <div className="order-date">Reservation Date: {order.date}</div>
      <div className="order-reserve">
        Reservation Amount{" "}
        <span style={{ color: "#47cc96" }}>🪙 {order.reservation}</span>
      </div>
      <div className="nft-row">
        <img
          className="nft-img"
          src={order.image}
          alt={order.title}
          loading="lazy"
        />
        <div className="nft-details">
          <div className="nft-title">{order.title}</div>
          <div className="nft-price">
            Price <span className="nft-currency">🪙</span> {order.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
