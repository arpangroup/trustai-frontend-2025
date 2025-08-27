import React, { useEffect, useState } from "react";
import './transaction.css';

import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';

const recentTransactions = [
  {
    icon: <BsCurrencyDollar />,
    amount: '350',
    title: 'Paypal Transfer',
    desc: 'Money Added',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'green-600',
  },
  {
    icon: <BsShield />,
    amount: '-560',
    desc: 'Bill Payment',
    title: 'Wallet',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: '#DC2526',
  },
  {
    icon: <FiCreditCard />,
    amount: '350',
    title: 'Credit Card',
    desc: 'Money reversed',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',

    pcColor: 'green-600',
  },
  {
    icon: <TiTick />,
    amount: '350',
    title: 'Bank Transfer',
    desc: 'Money Added',

    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <BsCurrencyDollar />,
    amount: '-50',
    percentage: '+38%',
    title: 'Refund',
    desc: 'Payment Sent',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
];

export default function Transaction() {
    return (
        <>
            {/* Recent Transactions Card */}
            <div className="recent-transactions-container">
                <div className="recent-transactions-card">
                    <div className="recent-header">
                        <p className="recent-title">Recent Transactions</p>
                    </div>
                    <div className="recent-list">
                        {recentTransactions.map((item) => (
                            <div key={item.title} className="recent-item">
                                <div className="recent-icon-group">
                                    <button
                                        type="button"
                                        style={{
                                            color: item.iconColor,
                                            backgroundColor: item.iconBg,
                                        }}
                                        className="recent-icon"
                                    >
                                        {item.icon}
                                    </button>
                                    <div>
                                        <p className="recent-item-title">{item.title}</p>
                                        <p className="recent-item-desc">{item.desc}</p>
                                    </div>
                                </div>
                                <p className={`recent-amount ${Number(item.amount) < 0 ? 'negative' : ''}`}>
                                    {Number(item.amount) < 0 ? '-' : '+'}${Math.abs(Number(item.amount))}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="recent-footer">
                        <button
                            style={{
                                backgroundColor: "#000",
                                color: "white",
                                borderRadius: "10px",
                                padding: "8px 16px",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Add
                        </button>
                        <p className="recent-count">36 Recent Transactions</p>
                    </div>
                </div>
            </div>
        </>
    );
}