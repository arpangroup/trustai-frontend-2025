import React, { useEffect, useState } from "react";
import "./Orders.css";

import DateFilter from "../../components/dateFilter/DateFilter";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";

import { CURRENCY_UNIT } from "../../constants/config";
import OrderCard from "../../components/cards/orderCard/OrderCard";
import DataContainer from "../../components/container/DataContainer";
import OrderCardSkeleton from "../../components/cards/orderCard/skeleton/OrderCardSkeleton";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Orders() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const fetchOrders = async () => {
    const params = {};
    if (dateRange.start) params.start = dateRange.start;
    if (dateRange.end) params.end = dateRange.end;

    // await delay(1000 * 3);

    const response = await apiClient.get(API_ROUTES.RESERVATION_API.ALL_ORDERS, {
      params,
    });

    return response.data || [];
  };

  return (
    <div className="order-container" style={{padding: '1rem', minHeight: '100vh'}}>

      <DateFilter onDateChange={(range) => setDateRange(range)} />
           

      <DataContainer
        fetchData={fetchOrders}
        dependencies={[dateRange]}
        noDataMessage="No order items found."
        loadingComponent={<OrderCardSkeleton cards={8} />}
        renderData={(orders) => (
          <>
            {orders.map((item, index) => (
              <OrderCard
                key={index}
                order={item}
                currency={item.currencyCode || CURRENCY_UNIT}
              />
            ))}
          </>
        )}
      />

    </div>
  );
}
