import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";

import DateFilter from "../../components/dateFilter/DateFilter";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";
import DataContainer from "../../components/container/DataContainer";
import StatPanelSkeleton from "../../components/statPanel/skeleton/StatPanelSkeleton";
import { formatTimestampTo_YY_MM_DD_HH_MM_SS } from '../../constants/dateFormatter';
import TransactionList from "./TransactionList";

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


export default function TransactionHistory() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
 
  const fetchTransactions = async () => {
    const params = {};
    if (dateRange.start) params.start = dateRange.start;
    if (dateRange.end) params.end = dateRange.end;

    // await delay(1000 * 3);

    const response = await apiClient.get(API_ROUTES.TRANSACTIONS.TRANSACTION_HISTORY, { params });
    //console.log("Transactions Response: ", response.data);
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
    <div className="date-filter-container transactions" style={{padding: '1rem', minHeight: '100vh'}}>

      <DateFilter onDateChange={(range) => setDateRange(range)} />


      <DataContainer
        fetchData={fetchTransactions}
        dependencies={[dateRange]}
        noDataMessage="No Data found"
        // loadingComponent={<StatPanelSkeleton cards={8} panels={2}/>}
        renderData={(items) => (    
          <TransactionList items={items} />
        )}
      />

    </div>
  );
}
