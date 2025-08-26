import React from "react"; 
import "./NFTGrid.css";
import NFTCard from "../nftCard/NFTCard";


export default function NFTGrid({ nfts }) {
  return (
    <div className="nft-grid">
      {nfts.map(nft => (
        <NFTCard key={nft.id} {...nft} />
      ))}
    </div>
  );
}
