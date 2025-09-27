import React, { useEffect } from 'react';
import './TransactionWidget.css';
import { useNavigate } from 'react-router';
import TransactionList from '../TransactionList';

const historyData = [
  {
    desc: "Withdraw",
    date: "2025-05-14 06:06:16",
    amount: -56.71332532,
  },
  {
    desc: "Withdraw",
    date: "2025-05-08 07:42:25",
    amount: -53,
  },
  {
    desc: "Activity reward",
    date: "2025-05-08 05:40:26",
    amount: 15,
  },
  {
    desc: "Activity reward",
    date: "2025-04-22 09:42:15",
    amount: 10,
  },
  {
    desc: "Deposit",
    date: "2025-04-15 08:32:10",
    amount: 50,
  },
];


const TransactionWidget = ({transactions = []}) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">History Record</span>
        <span className="chevron" onClick={() => navigate(`/transactions`)}>
          <svg width="18" height="18" fill="none" stroke="#a7b7c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 3 12 9 6 15" />
          </svg>
        </span>
      </div>      
        <TransactionList items={transactions} />
    </div>
  );
};

export default TransactionWidget;