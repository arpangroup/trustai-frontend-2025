import React, { useEffect, useState } from "react";
import "./ReferralScreen.css";
import { QRCodeCanvas } from "qrcode.react";
import { FaCopy, FaDownload, FaShareAlt } from "react-icons/fa";
import Toast from "../../components/toast/Toast";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";
import { REFERRAL_URL, REGISTRATION_URL } from "../../constants/config";
import CopyToClipboard from "../../components/clipboard/CopyToClipboard";

export default function ReferralScreen() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [referralCode, setReferralCode] = useState("REF12345");
  const referralLink = REFERRAL_URL(referralCode);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const resp = await apiClient.get(API_ROUTES.USER_INFO);
      const userInfo = resp.data;
      //console.log("USER_RESPONSE: ", resp.data);
      setUserInfo(userInfo);
      setReferralCode(userInfo.referralCode);
    } catch (err) {
      //setError('Failed to load data');
      //console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `referral-code-${referralCode}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    showToast("Copied to clipboard!", "success");
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join me on Example App!",
          text: `Use my referral code: ${referralCode}`,
          url: referralLink,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="referral-container">
      <h2 className="referral-title">Invite & Earn</h2>

      {/* QR Code */}
      <div className="qr-wrapper">
        <QRCodeCanvas value={referralLink} size={180} bgColor="#1e1e1e" fgColor="#ffffff" />
        <FaDownload className="download-icon" onClick={downloadQRCode} title="Download QR" />
      </div>

      {/* Referral Code */}
      <div className="referral-code-box">
        <span className="referral-code">{referralCode}</span>
        {/* <FaCopy className="copy-icon" onClick={copyToClipboard} /> */}
        <CopyToClipboard
          text={referralCode}
          onCopy={showToast}
          size={20}
          color="#4cafef"
          className="copy-icon"
        />
      </div>

      {/* Share Button */}
      <button className="share-button" onClick={shareReferral}>
        <FaShareAlt className="share-icon" /> Share Invite
      </button>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
