import React, { useEffect, useState } from "react";
import "./Orders.css";

import StatPanel from "../../components/statPanel/StatPanel";
import DateRangePicker from "../../components/input/datepicker/DateRangePicker";
import Chip from "../../components/chip/Chip";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";

import { formatDateTime } from "../../constants/dateFormatter";
import { CURRENCY_UNIT } from "../../constants/config";
import NoData from "../../components/NoData";
import OrderItem from "../../components/cards/orderItem/OrderItem";
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
  const [selectedChip, setSelectedChip] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(false);

  const chips = ["All", "Today", "Yesterday", "Week", "Month"];

  const formatDate = (date) => {
    if (!date) return "";
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchOrders();
  }, [dateRange]);

  
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const params = {};

        if (dateRange.start) params.start = dateRange.start;
        if (dateRange.end) params.end = dateRange.end;

        const response = await apiClient.get(API_ROUTES.RESERVATION_API.ALL_ORDERS, { params });
        
        // ✅ Map your response as needed
        const data = response.data;
        console.log("ORDERS: ", data);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching member summary:", err.message);
      } finally {
        setLoading(false);
      }
    };

  const handleDateChange = (range) => {
    setDateRange({
      start: range.start ? formatDate(new Date(range.start)) : "",
      end: range.end ? formatDate(new Date(range.end)) : "",
    });
    setSelectedChip("Custom");
  };

  const handleChipClick = (chip) => {
    setSelectedChip(chip);
    const today = new Date();
    let start = "", end = "";

    switch (chip) {
      case "Today":
        start = end = formatDate(today);
        break;
      case "Yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        start = end = formatDate(yesterday);
        break;
      case "Week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6);
        start = formatDate(weekStart);
        end = formatDate(today);
        break;
      case "Month":
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        start = formatDate(monthStart);
        end = formatDate(today);
        break;
      case "All":
      default:
        start = end = "";
        break;
    }

    setDateRange({ start, end });
  };

  return (
    <div className="date-filter-container">

      {/* Date Range Picker */}
      <DateRangePicker value={dateRange} onChange={handleDateChange} />

      {/* Chip Filter */}
      <div className="chip-list" style={{marginTop: '20px', marginBottom: '24px'}}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            active={selectedChip === chip}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>

      
    <div>
      {loading && <p>Loading stake items...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <NoData message="No order items found." />
      )}

      {!loading && !error && orders.map((item, index) => {
        const {
          reservationId,
          schemaTitle,
          imageUrl,
          reservedAmount,
          reservedAt,
          expiryAt,
          incomeEarned
        } = orders;
        const orderNo = formatOrderNo(reservedAt, reservationId);

        return(
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
