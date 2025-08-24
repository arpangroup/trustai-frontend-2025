import React from "react";
// import styles from "./NftList.module.css"; 
import "./NftList.css";
// import NftCard from "./NftCard";

import Image1 from '../../assets/bids1.png';
import Image2 from '../../assets/bids2.png';


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

const NftList = ({ items }) => {
  return (
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
  );
};

export default NftList;


