import React, { useEffect, useState } from "react";
import "./Members.css";
import StatPanel from "../../components/statPanel/StatPanel";
import DateRangePicker from "../../components/input/datepicker/DateRangePicker";
import Chip from "../../components/chip/Chip";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";

const defaultItems = [
    { label: "5", value: "Registered Member" },
    { label: "3", value: "Total Active Member" },
    { label: "7", value: "Member A" },
    { label: "12", value: "Valid A" },
];

export default function Members() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedChip, setSelectedChip] = useState("All");
  const [items, setItems] = useState([]); // For dynamic API response
  const [loading, setLoading] = useState(false);

  const chips = ["All", "Today", "Yesterday", "Week", "Month"];

  const formatDate = (date) => {
    if (!date) return "";
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().split("T")[0];
  };

  // 🔁 Fetch member summary from API
  useEffect(() => {
    const fetchMemberSummary = async () => {
      try {
        setLoading(true);
        const params = {};

        if (dateRange.start) params.start = dateRange.start;
        if (dateRange.end) params.end = dateRange.end;

        const response = await apiClient.get(API_ROUTES.MEMBER_SUMMARY, { params });
        
        // ✅ Map your response as needed
        const data = response.data;
        console.log("MEMBER_DATA: ", data);
        const transformedItems = [
          { label: data.totalUser || "0", value: "Registered Member" },
          { label: data.totalActive || "0", value: "Total Active Member" },
          { label: data.direct || "0", value: "Member A" },
          { label: data.activeDirect || "0", value: "Valid A" },          
          { label: data.indirect || "0", value: "Member B" },
          { label: data.activeIndirect || "0", value: "Valid B" },
          { label: data.third || "0", value: "Member C" },
          { label: data.activeThird || "0", value: "Valid C" },
        ];
        
        setItems(transformedItems);
      } catch (err) {
        console.error("Error fetching member summary:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberSummary();
  }, [dateRange]);

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
      <div className="chip-list" style={{marginTop: '20px'}}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            active={selectedChip === chip}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>

      {/* Stat Panels */}
      <div style={{marginBottom: '80px', marginTop: '16px'}}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
          <StatPanel key="1" items={items.slice(0, 4)} />
          <StatPanel key="2" items={items.slice(4)} />
          </div>
        )}
      </div>

    </div>
  );
}
