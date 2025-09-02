import React, { useEffect, useState } from "react";
import "./DateRangePicker.css";

export default function DateRangePicker({ value, onChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const [start, setStart] = useState(value?.start || "");
  const [end, setEnd] = useState(value?.end || "");

  // Sync internal state when parent updates dateRange
  useEffect(() => {
    setStart(value?.start || "");
    setEnd(value?.end || "");
  }, [value]);

  const handleDateChange = (type, date) => {
    const updated = { start, end };
    updated[type] = date;
    if (type === "start") setStart(date);
    if (type === "end") setEnd(date);
    onChange(updated);
  };

  return (
    <div className="date-picker-container">
      <input
        type="text"
        readOnly
        className="date-input"
        value={start && end ? `${start} → ${end}` : "Select Date Range"}
        onClick={() => setShowPicker(!showPicker)}
      />
      <span
        className="datepicker-icon"
        onClick={() => setShowPicker(!showPicker)}
      >
        📅
      </span>

      {showPicker && (
        <div className="date-picker-popup">
          <div>
            <label>Start Date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => handleDateChange("start", e.target.value)}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              value={end}
              onChange={(e) => handleDateChange("end", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
