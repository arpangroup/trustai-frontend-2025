import React, { useState } from 'react';
import './DepositPage.css';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import DepositManual from './DepositManual';
import { DEPOSIT_ADDRESS } from '../../constants/config';
import Toast from '../../components/toast/Toast';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';


const DepositPage = () => {
    const navigate = useNavigate();
    const [panelOpen, setPanelOpen] = React.useState(false);
    const downloadQRCode = () => {
      const canvas = document.querySelector("canvas");
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `deposit-address-${DEPOSIT_ADDRESS}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

  return (
    <>
    <div className="deposit-container">
      {/* <button className="panel-toggle-btn" onClick={() => setPanelOpen(true)}>&lt; <span>Manual</span></button> */}
      <button className="panel-toggle-btn" onClick={() => setPanelOpen(true)}>
        &lt;<span>Submit Proof</span>
      </button>

      {/* <div className="deposit-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <div className="header-title-wrapper">
            <h2>Deposit</h2>
        </div>
      </div> */}

      <div className="deposit-main" style={{marginBottom: '80px'}}>
          <div className="select__wrapper">
            <select>
              <option>USDT-BEP-20</option>
              <option>USDT-TRON</option>
              <option>USDT-SOL</option>
              <option>TUFT-BEP-20</option>
            </select>
          </div>

          <div className="qr-section">
            <h3>Deposit Chain</h3>
            <p className="min-deposit">Minimum Deposit: 50 USDT</p>
            <p className="warning-text">*Only USDT-BEP-20 deposits accepted. Others will be lost.</p>
            <div className="qr-placeholder">
                <QRCodeCanvas
                    value={DEPOSIT_ADDRESS}
                    size={160}
                    bgColor="transparent"
                    fgColor="#3B82F6"
                    level="L"
                    />
            </div>
            <button 
              className="btn-outline"
              onClick={downloadQRCode}
            >Save QR Code</button>
            <p className="note">Only USDT, no NFT</p>
          </div>

          <div className="details">
            <div className="detail-item">
              <span className="label">USDT Deposit Address</span>
              <div className="address-row">
                <span className="address">0x70557e7f8d1fb2ca0f87042b9d5e3c62b97c59d9</span>
                <img
                  src="https://image.treasurenft.xyz/Treasure2.5/btn/btn_edit_01_nor.png"
                  alt="copy"
                  className="copy-icon"
                />
              </div>
            </div>
            <div className="detail-item">
              <span className="label">Chain</span>
              <span className="value">BSC (BEP-20)</span>
            </div>
          </div>

      </div>
    </div>

    {/* Right panel */}
    {panelOpen && (
      <DepositManual
        onClose={() => setPanelOpen(false)}
        onSuccess={() => navigate("/wallet")}
      />
    )}  

    </>
  );
};

export default DepositPage;
