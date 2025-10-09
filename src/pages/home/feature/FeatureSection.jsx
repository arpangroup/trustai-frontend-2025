
import './FeatureSection.css'

export default function FeatureSection() {

    return (
        <div className="section-container">
            <div className="section">
                <h1>THE AMAZING NFT ART <br /> OF THE WORLD</h1>

                <div className="feature">
                    <div className="feature-icon">⚡️</div>
                    <div className="feature-text">
                        <h2>Fast Transactions</h2>
                        <p>Experience lightning-fast NFT transactions powered by cutting-edge blockchain technology. Every purchase, sale, and transfer happens within seconds — fully secured, transparent, and trackable on-chain. No delays, no hidden fees — just smooth, trusted digital trading.
                        </p>
                    </div>
                </div>

                <div className="feature">
                    <div className="feature-icon">📈</div>
                    <div className="feature-text">
                        <h2>Growth-Oriented Transactions</h2>
                        <p>Join a rapidly expanding NFT ecosystem where every asset has real growth potential. Our platform is designed for creators and collectors who want more than just art — a future of financial opportunity. Watch your digital assets appreciate as the NFT world evolves..</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
