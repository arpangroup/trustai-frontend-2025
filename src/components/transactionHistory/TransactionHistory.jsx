import React, { useEffect } from 'react';
import './TransactionHistory.css';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';
import DataContainer from '../container/DataContainer';
import { formatTimestampTo_YY_MM_DD_HH_MM_SS } from '../../constants/dateFormatter';

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


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const TransactionHistory = () => {

  const fetchRecentTransactions = async () => {
    // await delay(1000 * 3);

    const response = await apiClient.get(API_ROUTES.TRANSACTIONS.TRANSACTION_HISTORY);
    console.log("Transactions Response: ", response.data);
    const transactions = response.data?.content || [];

    const transformedTransactions = transactions.map(txn => ({
      amount: new Intl.NumberFormat().format(txn.amount),
      txnType: txn.txnTypeDisplayName,
      credit: txn.credit,
      remarks: txn.remarks,
      date: formatTimestampTo_YY_MM_DD_HH_MM_SS(txn.createdAt),
    }));
    return transformedTransactions;
  };



  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">History Record</span>
        <span className="chevron">
          <svg width="18" height="18" fill="none" stroke="#a7b7c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 3 12 9 6 15" />
          </svg>
        </span>
      </div>
      <ul className="history-list">

        <DataContainer
          fetchData={fetchRecentTransactions}
          dependencies={[]}
          noDataMessage="No pending transactions found."
          // loadingComponent={<OrderCardSkeleton cards={8} />}
          renderData={(transactions) => (
            <>
              {transactions.map((item, index) => (
                <li className="history-item" key={index}>
                  <div>
                    <div className="desc">{item.remarks.split(':')[0]}</div>
                    {/* <div className="date">{item.remarks}</div> */}
                    <div className="date">{item.date}</div>
                  </div>
                  <div className="right-block">
                    <span className={`amount ${item.amount < 0 ? 'negative' : 'positive'}`}>
                      {item.amount < 0 ? '' : '+'}{item.amount}
                    </span>
                    <span className="deposited">{item.txnType}</span>
                  </div>
                </li>
              ))}
            </>
          )}
        />
      </ul>
    </div>
  );
};

export default TransactionHistory;