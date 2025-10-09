import React from 'react';
import { formatTimestampTo_YY_MM_DD_HH_MM_SS } from '../../constants/dateFormatter';

const isCredit = (item) => {
  if (typeof item.credit === 'boolean') {
    return item.credit;
  }

  // Fallback logic
  if (item.txnType === 'WITHDRAWAL') {
    return false;
  }

  return true;
};

const TransactionList = ({ items }) => (
  <ul className="history-list transaction-history" style={{ background: '#fff' }}>
    {items.map((item, index) => (
      <li className="history-item" key={index}>
        <div>
          <div className="desc">{item.remarks?.split(':')[0] ?? ''}</div>
          <div className="date">{formatTimestampTo_YY_MM_DD_HH_MM_SS(item.date)}</div>
        </div>
        <div className="right-block">
          <span className={`amount ${isCredit(item) ? 'positive' : 'negative'}`}>
            {isCredit(item) ? '+' : '-'}
            {item.amount}
          </span>
          <span className="deposited">{item.txnType}</span>
        </div>
      </li>
    ))}
  </ul>
);

export default TransactionList;
