import React from "react"; 
import "./NFTGrid.css";
import SoldStakeCard from "../../cards/soldStakeCard/SoldStakeCard";


export default function NFTGrid({ nfts }) {
  return (
    <div className="nft-grid">
      {nfts.map((nft, index) => (
        <SoldStakeCard key={index} {...nft} />
      ))}
    </div>
  );
}
