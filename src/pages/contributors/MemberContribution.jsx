import React, { useState } from "react";
import "./MemberContribution.css";

import StatPanel from "../../components/statPanel/StatPanel";
import DateFilter from "../../components/dateFilter/DateFilter";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";
import DataContainer from "../../components/container/DataContainer";
import StatPanelSkeleton from "../../components/statPanel/skeleton/StatPanelSkeleton";
import Tabs from "../store/tabs/Tabs";
import TabsSkeleton from "../../components/tabs/skeleton/TabsSkeleton";

//const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tabs = [
  { key: "a_member", label: "AMember" },
  { key: "b_member", label: "BMember" },
  { key: "c_member", label: "CMember" },
];

const CombinedSkeleton = () => (
  <>
    <StatPanelSkeleton cards={4} panels={1} />
    <TabsSkeleton count={4} />
  </>
);

// ✅ Extracted reusable component
const MemberList = ({ members = [] }) => {
  if (members.length === 0) {
    return <div className="text-center text-muted p-3">No members found</div>;
  }

  return (
    <div className="list-group">
      {members.map((m) => (
        <div key={m.userId} className="list-card" role="listitem">
          <div className="list-card-left">
            <div className="user-icon">{m.username.charAt(0).toUpperCase()}</div>
            <div className="username">{m.username}</div>
          </div>
          <div className="share-amount">${m.share}</div>
        </div>
      ))}
    </div>
  );
};

export default function MemberContribution() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("a_member");

  const fetchMemberSummary = async () => {
    const params = {};
    if (dateRange.start) params.start = dateRange.start;
    if (dateRange.end) params.end = dateRange.end;

    //await delay(1000 * 5);
    const response = await apiClient.get(API_ROUTES.MEMBER_SUMMARY, { params });

    const data = response.data;
    setMembers(data.memembers || []);

    return [
      { label: data.totalShare || "0", value: "All Rebates" },
      { label: data.memberA || "0", value: "Rebate A" },
      { label: data.memberB || "0", value: "Rebate B" },
      { label: data.memberC || "0", value: "Rebate C" },
    ];
  };

  const getFilteredMembers = () => {
    const relatedType = activeTab.charAt(0).toUpperCase(); // "a_member" → "A"
    return members.filter((m) => m.related === relatedType);
  };

  return (
    <div className="date-filter-container" style={{ padding: '1rem', minHeight: '100vh' }}>
      <DateFilter onDateChange={setDateRange} />

      <DataContainer
        fetchData={fetchMemberSummary}
        dependencies={[dateRange]}
        noDataMessage="No Data found"
        loadingComponent={<CombinedSkeleton />}
        renderData={(items) => (
          <>
            <StatPanel key="stat-panel" items={items} />
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="tab-content">
              <MemberList members={getFilteredMembers()} />
            </div>
          </>
        )}
      />
    </div>
  );
}
