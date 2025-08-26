import React, { useState, useRef, useEffect } from "react";
import './Explore.css';
import HeaderMenu  from "./headerMenu/HeaderMenu";
import Stake from "./stake/Stake";

export default function Explore() {
  // Menus and Tabs Config
  const MENUS = [
    { key: "stake", label: "Stake" },
    { key: "polygonNFT", label: "PolygonNFT" },
    { key: "art", label: "Art" },
    { key: "collectibles", label: "Collectibles" }
  ];


  // State
  const [currentMenu, setCurrentMenu] = useState("stake");
  const [currentTab, setCurrentTab] = useState("stake");
  const [showOptions, setShowOptions] = useState(true);

  // Refs for highlights
  const menuHighlightRef = useRef(null);
  const tabHighlightRef = useRef(null);
  const headerMenuRef = useRef(null);

  // Move header menu highlight
  useEffect(() => {
    const activeEl = headerMenuRef.current?.querySelector(".menu-item.active");
    if (activeEl && menuHighlightRef.current) {
      menuHighlightRef.current.style.width = activeEl.offsetWidth + "px";
      menuHighlightRef.current.style.left = activeEl.offsetLeft + "px";
    }
  }, [currentMenu]);

  // Move tab highlight
  useEffect(() => {
    const tabId =
      currentTab === "mystake"
        ? "tabMyStake"
        : currentTab === "stake"
        ? "tabStake"
        : "tabCollection";
    const activeTab = document.getElementById(tabId);
    if (activeTab && tabHighlightRef.current) {
      tabHighlightRef.current.style.width = activeTab.offsetWidth + "px";
      tabHighlightRef.current.style.left = activeTab.offsetLeft + "px";
    }
  }, [currentTab]);



  return (
    <div style={{background: "#f3f8fa"}}>
      <HeaderMenu
        menus={MENUS}
        activeMenu={currentMenu}
        onChange={setCurrentMenu}
        highlightRef={menuHighlightRef}
        menuRef={headerMenuRef}
      />

      <div id="headerContentArea" style={{marginTop: "40px"}}>
        {/* PolygonNFT Content */}
        {currentMenu === "stake" && (
          <Stake/>
        )}

        {/* Art Content */}
        {currentMenu === "art" && (
          <div className="header-tab-content active" id="art">
            <div className="dummy-content" style={{ padding: "40px 24px" }}>
              <h2>Art Menu Content</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis mi sed urna pulvinar.
              </p>
            </div>
          </div>
        )}

        {/* Collectibles Content */}
        {currentMenu === "collectibles" && (
          <div className="header-tab-content active" id="collectibles">
            <div className="dummy-content" style={{ padding: "40px 24px" }}>
              <h2>Collectibles Menu Content</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius ligula vitae diam dignissim.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
