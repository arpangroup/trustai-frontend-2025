import React from "react";

const NftCard = ({ img, title, timer, creatorImg, creatorName, price }) => {
  return (
    <div className="nft-card">
      <img src={img} alt={title} className="nft-img" />
      <div className="nft-info">
        <span className="nft-title">{title}</span>
        <span className="nft-timer">⏰ {timer}</span>
        <div className="nft-creator">
          <img className="creator-avatar" src={creatorImg} alt={creatorName} />
          <span className="creator-name">{creatorName}</span>
        </div>
        <span className="nft-price">{price}</span>
      </div>
    </div>
  );
};

export default NftCard;
