import React from 'react';
import './OrderItem.css';
import KeyValuePair from '../../keyValuePair/KeyValuePair';

const OrderItem = ({
  orderNo,
  itemName,
  itemId,
  itemPrice,
  reservationDate,
  drawDate,
  itemImg,
  estimatedAmount,
  currency,
  isSold = true,
}) => (
  <div className="tab-pane active py-3">
    <div className="reservation-card position-relative">
      {/* Draw date */}
      <p className="text-info fw-bold mb-1">Draw date: {drawDate}</p>

      {/* Order No. title */}
      <p className="fw-bold mb-1 text-light">Order No.:</p>

      {/* Order No. */}
      <p className="text-light mb-2">{orderNo}</p>

      {/* Reservation date */}
      <p className="reservation-date">{`Reservation date: ${reservationDate}`}</p>

      {/* Estimated amount */}
      <KeyValuePair
        label="Estimated Amount"
        value={`${estimatedAmount} ${currency}`}
        valueStyle={{color: '#90ee90', fontSize: '12x', fontWeight: 600}}
      />

      {/* Item image and info */}  
    <div className="item-info-container mt-4 d-flex align-items-center">
    <img src={itemImg} alt="Item" className="item-img me-3" />
    <div className="item-text-container">
        {/* <p className="fw-bold mb-1 text-light text-truncate">{itemName}</p> */}
        <p className="fw-bold mb-1 text-light">{itemName}</p>
        <div className="d-flex align-items-center">
        <p className="text-muted fw-semibold mb-0 me-2">Item Price: <span className="text-light">{itemPrice} {currency}</span></p>
        
        </div>
    </div>
    </div>

      {/* Won badge on right side */}
      {isSold && (
        <span
          className={`badge position-absolute ${
            isSold === 'Won' ? 'bg-success' : 'bg-secondary'
          } status-badge`}
        >
          <h3>SOLD</h3>
        </span>
      )}
    </div>
  </div>
);

export default OrderItem;
