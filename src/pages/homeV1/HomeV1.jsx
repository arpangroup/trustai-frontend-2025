import React, { useState } from "react";
import HeaderV1 from "../../components/headerV1/HeaderV1";
import NavRow from "../../components/navrow/NavRow";
import Tabs from "../../components/tabs/Tabs";
import NftList from "../../components/nftList/NftList";
import "./HomeV1.css";

function HomeV1() {
  const [activeTab, setActiveTab] = useState("all");

  const nftData = [
    {
      id: 1,
      img: "images/01.jpg",
      title: "Mosu #1930",
      timer: "102d Left",
      creatorImg: "images/01.jpg",
      creatorName: "CryptoPunks",
      price: "275.74 USDT",
    },
    {
      id: 2,
      img: "images/01.jpg",
      title: "Mosu #1931",
      timer: "88d Left",
      creatorImg: "images/01.jpg",
      creatorName: "CryptoPunks",
      price: "315.50 USDT",
    },
    {
      id: 3,
      img: "images/03.jpg",
      title: "Mosu #1932",
      timer: "45d Left",
      creatorImg: "images/01.jpg",
      creatorName: "CryptoPunks",
      price: "420.00 USDT",
    },
  ];

  return (
    <div className="container">
      {/* Header */}
      <HeaderV1
        username="RANTUPATRA25"
        avatar="https://static.wikia.nocookie.net/pokemon/images/1/15/133Eevee.png"
        level="Lv.1"
        points="0 Points"
      />

      {/* Navigation */}
      <NavRow items={["Stake", "Mint", "Reserve", "Govern"]} />

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "all" && <NftList items={nftData} />}
      {activeTab === "art" && (
        <div className="tab-content active">
          <h3>🎨 Art NFTs</h3>
          <p>Some dummy content about Art NFTs collection.</p>
        </div>
      )}
      {activeTab === "celeb" && (
        <div className="tab-content active">
          <h3>⭐ Celebrities NFTs</h3>
          <p>Content about celebrity-based NFTs here.</p>
        </div>
      )}
      {activeTab === "gaming" && (
        <div className="tab-content active">
          <h3>🎮 Gaming NFTs</h3>
          <p>Exclusive gaming items and skins can be showcased here.</p>
        </div>
      )}
    </div>
  );
}

export default HomeV1;
