import React from "react"; 
import "./NFTGrid.css";
import NFTCard from "../cards/myStakeCard/MyStakeCard";


export default function NFTGrid({ nfts }) {
  return (
    <div className="nft-grid">
      {nfts.map(nft => (
        <NFTCard key={nft.id} {...nft} />
      ))}
    </div>
  );
}
