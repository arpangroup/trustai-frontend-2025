import React from 'react';
import './TransactionHistory.css';

const TransactionHistory = () => {
    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title">History Record</span>
                <span className="chevron">
                    {/* Inline right-chevron SVG */}
                    <svg width="18" height="18" fill="none" stroke="#a7b7c6" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round">
                        <polyline points="6 3 12 9 6 15" />
                    </svg>
                </span>
            </div>
            <ul className="history-list">
                <li className="history-item">
                    <div>
                        <div className="desc">Withdraw</div>
                        <div className="date">2025-05-14 06:06:16</div>
                    </div>
                    <div className="right-block">
                        <span className="amount negative">-56.71332532</span>
                        <span className="deposited">Deposited</span>
                    </div>
                </li>
                <li className="history-item">
                    <div>
                        <div className="desc">Withdraw</div>
                        <div className="date">2025-05-08 07:42:25</div>
                    </div>
                    <div className="right-block">
                        <span className="amount negative">-53</span>
                        <span className="deposited">Deposited</span>
                    </div>
                </li>
                <li className="history-item">
                    <div>
                        <div className="desc">Activity reward</div>
                        <div className="date">2025-05-08 05:40:26</div>
                    </div>
                    <div className="right-block">
                        <span className="amount positive">+15</span>
                        <span className="deposited">Deposited</span>
                    </div>
                </li>
                <li className="history-item">
                    <div>
                        <div className="desc">Activity reward</div>
                        <div className="date">2025-04-22 09:42:15</div>
                    </div>
                    <div className="right-block">
                        <span className="amount positive">+10</span>
                        <span className="deposited">Deposited</span>
                    </div>
                </li>
                <li className="history-item">
                    <div>
                        <div className="desc">Deposit</div>
                        <div className="date">2025-04-15 08:32:10</div>
                    </div>
                    <div className="right-block">
                        <span className="amount positive">+50</span>
                        <span className="deposited">Deposited</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default TransactionHistory;