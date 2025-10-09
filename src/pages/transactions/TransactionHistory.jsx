import React, { useEffect, useState } from "react";
import "./TransactionHistory.css";

import DateFilter from "../../components/dateFilter/DateFilter";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";
import DataContainer from "../../components/container/DataContainer";
import TransactionList from "./TransactionList";
import TransactionHistorySkeleton from "./skeleton/TransactionHistorySkeleton";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      date: txn.createdAt,
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
        loadingComponent={<TransactionHistorySkeleton cards={8} panels={2}/>}
        renderData={(items) => (    
          <TransactionList items={items} />
        )}
      />

    </div>
  );
}
