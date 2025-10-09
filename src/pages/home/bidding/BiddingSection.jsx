
import './BiddingSection.css'

const imageUrl = "https://picsum.photos/200/300";
const avatar = "https://picsum.photos/200/300";

export default function BiddingSection() {

    return (
        <div style={{padding: "12px"}}>
            <div className="section-header">
                <h2>Stake and Bidding</h2>
            </div>

            <div className="bid-card">
                <div className="bid-main">
                    <img className="bid-image" src={imageUrl} alt="NFT" />

                    <div className="bid-info">
                        <h3 className='info-title'>PunkCate_1070</h3>
                        <div className="creator">
                            <img src={avatar} alt="Avatar" />
                            <span>CryptoPunks</span>
                        </div>

                        <div className="bid-details">
                            <div className="row">
                                <div>Stake value</div>
                                <span>287 USDT</span>
                            </div>
                            <div className="row">
                                <div>Monthly earnings</div>
                                <span>30%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bid-footer">
                    <div>Time left: <strong>14 days</strong></div>
                    <div>Earning: <span>58 USDT</span></div>
                </div>
            </div>


            <div className="bid-card">
                <div className="bid-main">
                    <img className="bid-image" src={imageUrl} alt="NFT" />

                    <div className="bid-info">
                        <h3 className='info-title'>PunkCate_1070</h3>
                        <div className="creator">
                            <img src={avatar} alt="Avatar" />
                            <span>CryptoPunks</span>
                        </div>

                        <div className="bid-details">
                            <div className="row">
                                <div>Stake value</div>
                                <span>287 USDT</span>
                            </div>
                            <div className="row">
                                <div>Monthly earnings</div>
                                <span>30%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bid-footer">
                    <div>Time left: <strong>14 days</strong></div>
                    <div>Earning: <span>58 USDT</span></div>
                </div>
            </div>


            <div className="bid-card">
                <div className="bid-main">
                    <img className="bid-image" src={imageUrl} alt="NFT" />

                    <div className="bid-info">
                        <h3 className='info-title'>PunkCate_1070</h3>
                        <div className="creator">
                            <img src={avatar} alt="Avatar" />
                            <span>CryptoPunks</span>
                        </div>

                        <div className="bid-details">
                            <div className="row">
                                <div>Stake value</div>
                                <span>287 USDT</span>
                            </div>
                            <div className="row">
                                <div>Monthly earnings</div>
                                <span>30%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bid-footer">
                    <div>Time left: <strong>14 days</strong></div>
                    <div>Earning: <span>58 USDT</span></div>
                </div>
            </div>


        </div>
    )
}
