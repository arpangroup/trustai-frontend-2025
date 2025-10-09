import React, { useEffect, useState } from "react";
import "./Members.css";

import StatPanel from "../../components/statPanel/StatPanel";
import DateFilter from "../../components/dateFilter/DateFilter";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";
import DataContainer from "../../components/container/DataContainer";
import StatPanelSkeleton from "../../components/statPanel/skeleton/StatPanelSkeleton";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultItems = [
    { label: "5", value: "Registered Member" },
    { label: "3", value: "Total Active Member" },
    { label: "7", value: "Member A" },
    { label: "12", value: "Valid A" },
];

export default function Members() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
 
  const fetchMemberSummary = async () => {
    const params = {};
    if (dateRange.start) params.start = dateRange.start;
    if (dateRange.end) params.end = dateRange.end;

    // await delay(1000 * 3);

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
      
    return transformedItems || [];
  };

  return (
    <div className="date-filter-container" style={{padding: '1rem', minHeight: '100vh'}}>

      <DateFilter onDateChange={(range) => setDateRange(range)} />

      {/* Stat Panels */}
      {/* <div style={{marginBottom: '80px', marginTop: '16px'}}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
          <StatPanel key="1" items={items.slice(0, 4)} />
          <StatPanel key="2" items={items.slice(4)} />
          </div>
        )}
      </div> */}

      <DataContainer
        fetchData={fetchMemberSummary}
        dependencies={[dateRange]}
        noDataMessage="No Data found"
        loadingComponent={<StatPanelSkeleton cards={8} panels={2}/>}
        renderData={(items) => (
          <>
            <StatPanel key="1" items={items.slice(0, 4)} />
            <StatPanel key="2" items={items.slice(4)} />
          </>
        )}
      />

    </div>
  );
}
