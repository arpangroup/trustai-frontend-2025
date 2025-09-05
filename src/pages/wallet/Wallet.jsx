import React, { useEffect, useState } from 'react';
import './Wallet.css';
import PendingTransactions from '../../components/transaction/PendingTransactions';
import TransactionHistory from '../../components/transactionHistory/TransactionHistory';
import Toast from '../../components/toast/Toast';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';
import { BsCurrencyDollar } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { CURRENCY_SYMBOL } from '../../constants/config';
import WalletPageSkeleton from './skeleton/WalletPageSkeleton';

// Section icons data
const sectionIconsData = [
    [
        { icon: '📱', label: 'Recharge', message: 'Recharge your mobile or DTH' },
        { icon: '🎒', label: 'Travelling', message: 'Book your travel tickets' },
        { icon: '🏨', label: 'Hotel', message: 'Find and book hotels' },
        { icon: '📶', label: 'Wifi', message: 'Recharge your internet plan' }
    ],
    [
        { icon: '💡', label: 'Electricity', message: 'Pay your electricity bills' },
        { icon: '🎬', label: 'Movie', message: 'Book your movie tickets' },
        { icon: '🏪', label: 'Store', message: 'Shop at nearby stores' },
        { icon: '…', label: 'More', message: 'Explore more services' }
    ]
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Wallet = () => {    
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [wallet, setWallet] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchWalletBalance();
    }, []);

    const fetchWalletBalance = async () => {
        try {
            //await delay(1000 * 3);
            const response = await apiClient.get(API_ROUTES.WALLET.WALLET_BALANCE);
            setWallet(response.data);
        } finally {
            setLoading(false); 
        }
    };    

    const handleIconClick = (message) => {
        // setToastMessage(message);
        setToastMessage("Coming soon. Stay tuned!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (loading) {
        return <WalletPageSkeleton />;
    }
    
    return (
        <div style={{ padding: '16px' }}>

            {/* Balance Section */}
            <section className="balance-section">
                <div className="balance-label">
                    Wallet Balance
                </div>
                <div className="balance-amount">{wallet.currency || CURRENCY_SYMBOL} {new Intl.NumberFormat().format(wallet.walletBalance)}</div>
            </section>

            {/* Cashback Banner */}
            <div className="cashback-banner">
                <div className="megaphone">📢</div>
                <div onClick={() => navigate("/referral")}>
                    <b>Cashback 100%</b><br />
                    <p>Invite your friends and get Cashback</p>
                </div>
            </div>


            {/* Services Card */}
            <div className="card">
                <div className="card-header">
                    <div className="card-title">Popular Services</div>
                    <button className="card-action">See More <i>›</i></button>
                </div>

                {/* Render section icons dynamically */}
                {sectionIconsData.map((row, rowIndex) => (
                    <div className="section-icons" key={rowIndex}>
                        {row.map((item, itemIndex) => (
                            <div 
                                className="section-icon" 
                                key={itemIndex}
                                onClick={() => handleIconClick(item.message)}
                            >
                                <span className="icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <TransactionHistory />

            {/* Recent Transactions Component */}
            {/* Pending Deposit or Pending Withdraw Requests */}
            <PendingTransactions/>

            {showToast && <Toast message={toastMessage} />}

        </div>
    );
};

export default Wallet;