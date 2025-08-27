import React from "react"; 
import "./NFTGrid.css";
import SoldStakeCard from "../../cards/soldStakeCard/SoldStakeCard";


export default function NFTGrid({ nfts }) {
  return (
    <div className="nft-grid">
      {nfts.map(nft => (
        <SoldStakeCard key={nft.id} {...nft} />
      ))}
    </div>
  );
}
