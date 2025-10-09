import React, { useState } from "react";
import DateRangePicker from "../input/datepicker/DateRangePicker";
import Chip from "../chip/Chip";

const chips = ["All", "Today", "Yesterday", "Week", "Month"];

const DateFilter = ({ onDateChange }) => {
  const [selectedChip, setSelectedChip] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const formatDate = (date) => {
    if (!date) return "";
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().split("T")[0];
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

    const newRange = { start, end };
    setDateRange(newRange);
    onDateChange(newRange);
  };

  const handleDateChange = (range) => {
    const newRange = {
      start: range.start ? formatDate(new Date(range.start)) : "",
      end: range.end ? formatDate(new Date(range.end)) : "",
    };
    setDateRange(newRange);
    setSelectedChip("Custom");
    onDateChange(newRange);
  };

  return (
    <div>
      <DateRangePicker value={dateRange} onChange={handleDateChange} />

      <div className="chip-list" style={{ padding: '6px 0px 24px 8px'}}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            active={selectedChip === chip}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>
    </div>
  );
};

export default DateFilter;
