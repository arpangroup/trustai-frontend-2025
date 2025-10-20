import React, { useEffect, useState } from "react";
import "./InstallBanner.css";
import AppIcon from "../../assets/pwa-192x192.png"; // small app icon

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    // Check if running as standalone (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        setIsInstalled(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isInstalled) setVisible(true);
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
<div className="install-banner show">
  <img src={AppIcon} alt="App Icon" className="banner-icon" />

  <div className="banner-content">
    <span className="banner-text">Install TrustAI for quick access to insights anytime, anywhere. Works offline too!</span>
  </div>

  <div className="banner-actions">
    <button className="btn btn-sm btn-light me-2 btn-primary" onClick={handleInstall}>Install</button>
    <button className="banner-close" onClick={handleDismiss}>✕</button>
  </div>
</div>
  );
};

export default InstallBanner;
