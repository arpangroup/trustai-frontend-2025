import React, { useState } from "react";
import "./WithdrawRequest.css";
import { FaTimes } from "react-icons/fa";

export default function WithdrawRequest() {
  const [amount, setAmount] = useState("");
  const withdrawAddress = "0xABCD1234EFGH5678IJKL"; // example address
  const availableBalance = 500; // example value
  const minimumWithdraw = 50; // example value
  const serviceCharge = 5; // example value

  const handleCancel = () => {
    setAmount("");
  };

  const handleConfirm = () => {
    alert(`Withdraw ${amount} USDT to ${withdrawAddress}`);
  };

  return (
    <div>
      <div className="withdraw-page">
        {/* <h2 className="withdraw-title">Withdraw Request</h2> */}
       

        <div className="withdraw-card" style={{marginTop: '16px'}}>
          {/* Withdraw Address */}
          <div className="form-group">
            <label>Withdraw Address</label>
            <input
              type="text"
              value={withdrawAddress}
              disabled
              className="withdraw-input"
            />
          </div>

          <hr className="divider" />

          {/* Amount Input */}
          <div className="form-group">
            <label>Amount</label>
            <div className="amount-wrapper">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="withdraw-input"
              />
              <span className="currency">USDT</span>
            </div>
          </div>

          <hr className="divider" />

          {/* Read-only Info */}
          <div className="info-row">
            <span>Available Balance</span>
            <span>{availableBalance} USDT</span>
          </div>
          <div className="info-row">
            <span>Minimum Withdraw</span>
            <span>{minimumWithdraw} USDT</span>
          </div>
          <div className="info-row">
            <span>Service Charge</span>
            <span>{serviceCharge} USDT</span>
          </div>

          <hr className="divider" />

          {/* Buttons */}
          <div className="button-row">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
