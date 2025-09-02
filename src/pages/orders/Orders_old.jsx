import React, { useEffect, useState } from "react";
import "./Orders.css";

import DateFilter from "../../components/dateFilter/DateFilter";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";

import { formatDateTime } from "../../constants/dateFormatter";
import { CURRENCY_UNIT } from "../../constants/config";
import NoData from "../../components/NoData";
import OrderCard from "../../components/cards/orderCard/OrderCard";

const defaultReservedItems = [{
  investmentId: 1,
  drawDate: '2025/08/01 03:03:40',
  status: 'Won',
  orderNo: 'R3AE9995033223',
  reservationDate: '(GMT+05:30) 2025/08/01 03:03:28',
  estimatedAmount: '50 ~ 1000',
  itemName: 'GiffgaffApeClub_0021549',
  itemPrice: '177.26',
  imageUrl: 'https://prodimage-dan.treasurefun.xyz/GiffgaffApeClub/GiffgaffApeClub_1470_compre.png'
}];

const formatOrderNo = (reservedAt, reservationId) => {
  const date = new Date(reservedAt);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const paddedId = String(reservationId).padStart(4, '0');
  return `TRST${yyyy}${mm}${dd}${paddedId}`;
};

export default function Orders() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [dateRange]);


  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      if (dateRange.start) params.start = dateRange.start;
      if (dateRange.end) params.end = dateRange.end;

      const response = await apiClient.get(API_ROUTES.RESERVATION_API.ALL_ORDERS, { params });

      // ✅ Map your response as needed
      const data = response.data || [];
      console.log("ORDERS: ", data);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching member summary:", err.message);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container">

      {/* ✅ Reusable Date Filter */}
      <DateFilter onDateChange={(range) => setDateRange(range)} />


      {/* ✅ Orders List */}
      <div>
        {loading && <p>Loading stake items...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <NoData message="No order items found." />
        )}

        {!loading && !error && orders.map((item, index) => {          
          return (
            <OrderCard
              key={index}
              order={item}
              currency={item.currencyCode || CURRENCY_UNIT}
            />
          );
        })}
      </div>


    </div>
  );
}
