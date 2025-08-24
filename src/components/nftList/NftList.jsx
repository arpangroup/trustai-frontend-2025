import React from "react";
import NftCard from "./NftCard";

const NftList = ({ items }) => {
  return (
    <div className="nft-list">
      {items.map((nft) => (
        <NftCard
          key={nft.id}
          img={nft.img}
          title={nft.title}
          timer={nft.timer}
          creatorImg={nft.creatorImg}
          creatorName={nft.creatorName}
          price={nft.price}
        />
      ))}
    </div>
  );
};

export default NftList;
