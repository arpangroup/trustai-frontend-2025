import React, { useState, useEffect, useRef } from "react";
import "./HomeV2.css";

import Image1 from '../../assets/bids1.png';
import Image2 from '../../assets/bids2.png';

const carouselSlides = [
  {
    title: "TrustAI",
    desc: "Explore the next miracle of NFT.",
    learnText: "LEARN MORE",
    subText: "TrustAI",
    imgSrc: Image1,
    alt: "Banner1",
  },
  {
    title: "Exclusive Drop",
    desc: "Collect rare NFTs today. Limited time only!",
    learnText: "LEARN MORE",
    subText: "TrustAI Collection",
    imgSrc: Image1,
    alt: "Banner2",
  },
];

const nftCards = [
  {
    imgSrc: Image1,
    alt: "NFT Art1",
    title: "Mosu #1930",
    timeLeft: "102d Left",
    ownerImg: Image1,
    ownerName: "CryptoPunks",
    price: "275.74 USDT",
  },
  {
    imgSrc: Image2,
    alt: "NFT Art2",
    title: "Astral Ape #23",
    timeLeft: "98d Left",
    ownerImg: Image1,
    ownerName: "MetaHeroes",
    price: "194.22 USDT",
  },
  {
    imgSrc: Image1,
    alt: "NFT Art3",
    title: "Neon Cat #88",
    timeLeft: "120d Left",
    ownerImg: Image1,
    ownerName: "PixelCats",
    price: "80.55 USDT",
  },
];

const collections = [
  {
    rank: 1,
    rankBg: "linear-gradient(135deg, #ffbb4c 55%, #f5831f)",
    imgSrc: Image1,
    alt: "Chain Hard Art #29",
    title: "Chain Hard Art #29",
    floor: "Floor: 17.98 ETH",
    value: "160.58",
    change: "-78%",
  },
  {
    rank: 2,
    rankBg: "#b5beca",
    imgSrc: Image2,
    alt: "Chain Hard Art #19",
    title: "Chain Hard Art #19",
    floor: "Floor: 17.98 ETH",
    value: "140.79",
    change: "-56%",
  },
  {
    rank: 3,
    rankBg: "#d19b53",
    imgSrc: Image1,
    alt: "Chain Hard Art #3",
    title: "Chain Hard Art #3",
    floor: "Floor: 17.98 ETH",
    value: "110.64",
    change: "-14%",
  },
  {
    rank: 4,
    rankBg: "#c2bbd2",
    imgSrc: "images/01.jpg",
    alt: "Chain Hard Art #89",
    title: "Chain Hard Art #89",
    floor: "Floor: 17.98 ETH",
    value: "60.04",
    change: "-6%",
  },
];

const navButtons = [
  { icon: "💎", label: "Stake" },
  { icon: "🎨", label: "Mint" },
  { icon: "🗓️", label: "Reserve" },
  { icon: "⚖️", label: "Govern" },
];

const bottomNavItems = [
  { icon: "🏠", label: "Home" },
  { icon: "⭐", label: "Reserve" },
  { icon: "📄", label: "Assets" },
  { icon: "👤", label: "My" },
];

const categoryTabs = [
  { name: "all", label: "All" },
  { name: "art", label: "Art" },
  { name: "celebrities", label: "Celebrities" },
  { name: "gaming", label: "Gaming" },
  { name: "more", label: "More" },
];

const tabContents = {
  art: "Discover trending Art NFTs here!",
  celebrities: "Spotlight on Celebrities collectibles!",
  gaming: "Level up with exclusive Gaming NFTs!",
  more: "More categories coming soon!",
};

export default function HomeV2() {
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveCarouselIndex((prev) => (prev + 1) % carouselSlides.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="mobile-container">
      {/* HEADER */}
      <div className="header">
        <div className="header-content">
          <img src="images/01.jpg" className="avatar" alt="User" />
          <div className="welcome-text">
            <div className="welcome">Welcome to TrustAI</div>
            <div className="signin">Click to sign in</div>
          </div>
        </div>
        <div className="header-icons">
          <div className="icon-btn" aria-label="Notifications" role="button">
            🔔
          </div>
          <div className="icon-btn" aria-label="Menu" role="button">
            ☰
          </div>
        </div>
      </div>

      {/* CAROUSEL SLIDER */}
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${activeCarouselIndex * 100}vw)` }}
        >
          {carouselSlides.map(({ title, desc, learnText, subText, imgSrc, alt }, i) => (
            <div className="carousel-slide" key={i}>
              <div className="banner">
                <div className="banner-txt">
                  <div className="banner-title">{title}</div>
                  <div className="banner-desc">{desc}</div>
                  <div className="banner-learn">{learnText}</div>
                  <div style={{ color: "#8b99bc", fontSize: 11, marginTop: 6 }}>{subText}</div>
                </div>
                <img src={imgSrc} className="banner-img" alt={alt} />
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {carouselSlides.map((_, i) => (
            <div
              key={i}
              className={`carousel-dot${i === activeCarouselIndex ? " active" : ""}`}
              onClick={() => setActiveCarouselIndex(i)}
              role="button"
              aria-label={`Slide ${i + 1}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setActiveCarouselIndex(i);
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* NAV ROW */}
      <div className="nav-row">
        {navButtons.map(({ icon, label }, i) => (
          <div className="nav-btn" key={i} role="button" tabIndex={0}>
            <div className="nav-btn-inner">
              <span className="nav-icon">{icon}</span>
            </div>
            <div className="nav-label">{label}</div>
          </div>
        ))}
      </div>

      {/* CATEGORY TABS */}
      <div className="category-row">
        {categoryTabs.map(({ name, label }) => (
          <div
            key={name}
            className={`category-tab${activeTab === name ? " active" : ""}`}
            onClick={() => setActiveTab(name)}
            role="tab"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") setActiveTab(name);
            }}
            aria-selected={activeTab === name}
          >
            {label}
          </div>
        ))}
      </div>

      {/* TABBED CONTENT */}
      <div id="categoryContent">
        {activeTab === "all" && (
          <div id="allTabContent" className="tab-container" style={{ display: "block" }}>
            <div className="nft-list" id="nftList">
              {nftCards.map(
                ({ imgSrc, alt, title, timeLeft, ownerImg, ownerName, price }, i) => (
                  <div className="nft-card" key={i}>
                    <img src={imgSrc} className="nft-img" alt={alt} />
                    <div className="nft-title-row">
                      <span className="nft-title">{title}</span>
                      <span className="nft-time">{timeLeft}</span>
                    </div>
                    <div className="nft-info-row">
                      <span className="nft-owner">
                        <img src={ownerImg} alt="OWNER" />
                        {ownerName}
                      </span>
                      <span className="nft-price">{price}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="section-title">Top collections</div>
            <div className="collection-list">
              {collections.map(
                ({ rank, rankBg, imgSrc, alt, title, floor, value, change }, i) => (
                  <div className="collection-item" key={i}>
                    <div
                      className="collection-rank"
                      style={{ background: rankBg }}
                    >
                      {rank}
                    </div>
                    <img src={imgSrc} className="collection-avatar" alt={alt} />
                    <div className="collection-details">
                      <div className="collection-title">{title}</div>
                      <div className="collection-floor">{floor}</div>
                    </div>
                    <div className="collection-value">{value}</div>
                    <div className="collection-change">{change}</div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {activeTab !== "all" && (
          <div className="tab-content" style={{ display: "block" }}>
            {tabContents[activeTab]}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        {bottomNavItems.map(({ icon, label }, i) => (
          <div className="bottom-nav-item" key={i} role="button" tabIndex={0}>
            <span className="bottom-nav-icon">{icon}</span>
            <span className="bottom-nav-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
