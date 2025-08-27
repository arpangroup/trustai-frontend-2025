import React, { useState, useRef, useEffect } from "react";
import './Explore.css';
import HeaderMenu  from "./headerMenu/HeaderMenu";
import Stakes from "./stakes/Stakes";
import NoData from "../../components/NoData";
import { useLocation } from "react-router-dom";

  const MENUS = [
    { key: "stake", label: "Stake" },
    { key: "art", label: "Art" },
    { key: "collectibles", label: "Collectibles" }
  ];

export default function Explore() {
  const location = useLocation();
  const initialTab = location.state?.activeTab || "stake";
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

  return (
    <div style={{background: "#f3f8fa"}}>
      <HeaderMenu
        menus={MENUS}
        activeMenu={currentMenu}
        onChange={setCurrentMenu}
        highlightRef={menuHighlightRef}
        menuRef={headerMenuRef}
      />

      <div id="headerContentArea" style={{marginTop: "40px", alignItems: 'center', minHeight: '600px'}}>
        {/* PolygonNFT Content */}
        {currentMenu === "stake" && (
          <Stakes initialTab={initialTab}/>
        )}

         {(currentMenu === "polygonNFT" || currentMenu === "art" || currentMenu === "collectibles") && (
          <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', height: '400px'}}>
            <NoData/>
          </div>
        )}
        
      </div>
    </div>
  );
}
