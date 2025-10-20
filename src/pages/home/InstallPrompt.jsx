import React, { useEffect, useState } from "react";
import "./InstallPrompt.css";
import AppIcon from "../../assets/pwa-192x192.png"; // small app icon

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleDismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="install-banner d-flex align-items-center justify-content-between show">
      <div className="d-flex align-items-center">
        <img src={AppIcon} alt="App" className="banner-icon me-2" />
        <span className="banner-text">Install TrustAI for quick access</span>
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-sm btn-primary me-2" onClick={handleInstall}>
          Install
        </button>
        <button className="btn btn-sm btn-light" onClick={handleDismiss}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
