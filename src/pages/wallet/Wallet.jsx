import React from 'react';
import './Wallet.css';
import Transaction from '../../components/transaction/Transaction';
import TransactionHistory from '../../components/transactionHistory/TransactionHistory';

const Wallet = () => {
    return (
        <div style={{ padding: '16px' }}>

            {/* Balance Section */}
            <section className="balance-section">
                <div className="balance-label">
                    Wallet Balance
                </div>
                <div className="balance-amount">$16,003.00</div>
            </section>

            {/* Cashback Banner */}
            <div className="cashback-banner">
                <div className="megaphone">📢</div>
                <div>
                    <b>Cashback 100%</b><br />
                    <p>Invite your friends and get Cashback</p>
                </div>
            </div>


            {/* Services Card Example */}
            <div className="card">
                <div className="card-header">
                    <div className="card-title">Popular Services</div>
                    <button className="card-action">See More <i>›</i></button>
                </div>
                <div className="section-icons">
                    <div className="section-icon">
                        <span className='icon'>📱</span>
                        <span>Recharge</span>
                    </div>
                    <div className="section-icon">
                        <span className='icon'>🎒</span>
                        <span>Travelling</span>
                    </div>
                    <div className="section-icon">
                        <span className='icon'>🏨</span>
                        <span>Hotel</span>
                    </div>
                    <div className="section-icon">
                        <span className='icon'>📶</span>
                        <span>Wifi</span>
                    </div>
                </div>
                <div className="section-icons">
                    <div className="section-icon">
                        <span className='icon'>💡</span>
                        <span>Electricity</span>
                    </div>
                    <div className="section-icon">
                        <span className='icon'>🎬</span>
                        <span>Movie</span>
                    </div>
                    <div className="section-icon">
                        <span className='icon'>🏪</span>
                        <span>Store</span>
                    </div>
                    <div className="section-icon">
                        <span className='icon'>…</span>
                        <span>More</span>
                    </div>
                </div>
            </div>

            <TransactionHistory />

            {/* Recent Transactions Component */}
            <Transaction/>



        </div>
    );
};

export default Wallet;