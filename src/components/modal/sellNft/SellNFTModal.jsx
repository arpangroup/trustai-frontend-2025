import './SellNFTModal.css';
import { FiX } from 'react-icons/fi';

const SellNFTModal = ({ 
  itemName,
  imageUrl,
  price,
  currency,
  handlingFee,
  royalty,
  onSell, 
  onClose 
}) => {
  return (
    <div className="drawer-content">
      <div className="drawer-body">
        <div className="step1-area">
          <h2 className="title">
           <FiX
              className="cancel-icon"
              onClick={onClose}
              aria-label="Close"
              role="button"
            />
            Sell
          </h2>

          <img
            className="img-item"
            alt="NFT Item"
            src={imageUrl}
          />

          <h3 className="item-name">{itemName}</h3>

          <div className="price-area">
            <h4 className="sub-title">Price</h4>
            <div className="price-row">
              <div className="select-coin">
                <img
                  src="https://image.treasurenft.xyz/coin/usdt.png"
                  alt="USDT icon"
                  className="coin-img"
                />
                <span className="coin-label">{currency}</span>
              </div>
              <div className="price-value">{price}</div>
            </div>
          </div>

          <div className="fee-area">
            <div className="fee-row">
              <h4 className="sub-title">Fees</h4>
              <span>{handlingFee}</span>
            </div>
            <div className="fee-row">
              <p>Royalty</p>
              <span>{royalty}%</span>
            </div>
          </div>

          <div className="footer">
            <button 
              className="btn-sell" 
              onClick={() => onSell()}>
              Sell Stake
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SellNFTModal;