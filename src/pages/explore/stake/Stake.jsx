import React, { useRef, useState } from "react";
import './Stake.css';
import Tabs from "../tabs/Tabs";
import OptionsArea from "../optionsArea/OptionsArea";
import StakeCard from "../../../components/cards/stakeCard/StakeCard";
import NFTGrid from "../../../components/nftGrid/NFTGrid";
import NoData from "../../../components/NoData";

import Image1 from '../../../assets/bids1.png';
import Image2 from '../../../assets/bids2.png';
import Image3 from '../../../assets/bids3.png';
import Image4 from '../../../assets/bids4.png';

  // Demo NFT data
  const NFTS = [
    { id: 1, imgSrc: Image1, title: "NoxiousAudience#01...", price: "873.03" },
    { id: 2, imgSrc: Image2, title: "NoxiousAudience#03...", price: "962.39" },
    { id: 3, imgSrc: Image3, title: "NoxiousAudience#04...", price: "857.38" },
    { id: 4, imgSrc: Image4, title: "NoxiousAudience#81...", price: "837.98" }
  ];

export default function Stake() {
  const [currentTab, setCurrentTab] = useState("stake");
  const [showOptions, setShowOptions] = useState(true);

  
  const TABS = [
    { key: "stake", label: "Stake", id: "tabStake" },
    { key: "mystake", label: "My Stake", id: "tabMyStake" },
    { key: "collection", label: "Collection", id: "tabCollection" }
  ];

  // Refs for highlights
  const menuHighlightRef = useRef(null);
  const tabHighlightRef = useRef(null);
  const headerMenuRef = useRef(null);

  return (
    <div className="header-tab-content active" id="stake">
      <div>
        <Tabs
          tabs={TABS}
          activeTab={currentTab}
          onTabChange={setCurrentTab}
          highlightRef={tabHighlightRef}
        />

        <div id="tabContentArea">
          {/* Stake Tab Content */}
          {currentTab === "stake" && (
            <div className="tab-content stake-tab-content active" id="stakeContent">
              <OptionsArea
                showOptions={showOptions}
                setShowOptions={setShowOptions}
              />
              {showOptions ? (
                <div id="stakeCardBlock">
                  <StakeCard
                    title="Exclusive stake 1"
                    level="LV2 - LV6"
                    img={
                      <span className="img-placeholder">
                        NFT EXCLUSIVE ZONE-1
                        <br />
                        🦧🦧🦧
                      </span>
                    }
                    status="open"
                    info={
                      <>
                        <div className="stake-row">
                          <span className="label">Price Range</span>
                          <span className="value">
                            <span className="usdt-icon"></span>
                            199 ~ 1000
                          </span>
                        </div>
                        <div className="stake-row">
                          <span className="label">Income</span>
                          <span className="value">1.5% - 1.5%</span>
                        </div>
                        <div className="stake-row">
                          <span className="label">Period</span>
                          <span className="value">7 - 30 Day</span>
                        </div>
                      </>
                    }
                    actionLabel="Stake"
                  />
                </div>
              ) : (
                <div id="freeZoneBlock">
                  <StakeCard
                    title="Free Zone Info"
                    img={
                      <span className="img-placeholder">
                        This is the Free Zone content.
                      </span>
                    }
                    info={
                      <div className="stake-row">
                        <span className="label">Note</span>
                        <span className="value">No exclusive stake required.</span>
                      </div>
                    }
                    cardImgStyle={{
                      background: "linear-gradient(90deg,#fdfb6f 0%,#fe8aff 100%)"
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* MyStake Tab Content */}
          {currentTab === "mystake" && (
            <div className="tab-content active" id="mystakeContent" style={{padding: '16px'}}>
              <NFTGrid nfts={NFTS} />
            </div>
          )}

          {/* Collection Tab Content */}
          {currentTab === "collection" && (
            <div className="tab-content active" id="collectionContent">
              <NoData/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
