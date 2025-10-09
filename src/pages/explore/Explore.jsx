import React, { useState, useRef, useEffect } from "react";
import './Explore.css';
import HeaderMenu  from "./headerMenu/HeaderMenu";
import Stakes from "./stakes/Stakes";
import NoData from "../../components/NoData";
import { useLocation } from "react-router-dom";
import ExplorePageSkeleton from "./skeleton/ExplorePageSkeleton";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";

const MENUS = [
  { key: "stake", label: "Stake" },
  { key: "art", label: "Art" },
  { key: "collectibles", label: "Collectibles" }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Explore() {
  const location = useLocation();
  const initialTab = location.state?.activeTab || "stake";
  const [currentMenu, setCurrentMenu] = useState("stake");
  const [currentTab, setCurrentTab] = useState("stake");
  const [showOptions, setShowOptions] = useState(true);
  const [stakes, setStakes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for highlights
  const menuHighlightRef = useRef(null);
  const tabHighlightRef = useRef(null);
  const headerMenuRef = useRef(null);

  useEffect(() => {
      fetchStakes();
  }, []);

  // Move header menu highlight
  useEffect(() => {
    const activeEl = headerMenuRef.current?.querySelector(".menu-item.active");
    if (activeEl && menuHighlightRef.current) {
      menuHighlightRef.current.style.width = activeEl.offsetWidth + "px";
      menuHighlightRef.current.style.left = activeEl.offsetLeft + "px";
    }
  }, [currentMenu]);

  const fetchStakes = async () => {
    setLoading(true);
    try {
      // await delay(1000 * 10);
      const res = await apiClient.get(API_ROUTES.EXPLORE.STAKE_LIST);
      // const response = stakes;
      //console.log("RESPONSE: ", response);
      setStakes(res.data?.content || []);
    } catch (err) {
      console.error('Failed to fetch stake items:', err);
      //setError('Failed to load stake items.');
    } finally {
      setLoading(false);
    }
  };


  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div style={{background: "#f3f8fa"}}>
      {loading ? (
        <ExplorePageSkeleton />
      ) : (
        <>
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
              <Stakes initialTab={initialTab} stakes={stakes} />
            )}

            {(currentMenu === "polygonNFT" || currentMenu === "art" || currentMenu === "collectibles") && (
              <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', height: '400px'}}>
                <NoData/>
              </div>
            )}
            
          </div>
        </>
      )}
    </div>
  );
}
