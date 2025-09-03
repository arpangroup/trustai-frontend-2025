import React, { useEffect, useState } from "react";
import "./MemberContribution.css";

import StatPanel from "../../components/statPanel/StatPanel";
import DateFilter from "../../components/dateFilter/DateFilter";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";
import DataContainer from "../../components/container/DataContainer";
import StatPanelSkeleton from "../../components/statPanel/skeleton/StatPanelSkeleton";

// import TabContainer from "../../../components/tab/TabContainer";
// import Tab from "../../../components/tab/Tab";
import { useLocation } from "react-router";
import Tabs from "../store/tabs/Tabs";
import TabsSkeleton from "../../components/tabs/skeleton/TabsSkeleton";
// import Transaction from "../../../components/transaction/Transaction";
// import MemberCard from "../../../components/card/recentItem/RecentItem";
// import RecentItem from "../../../components/card/recentItem/RecentItem";

const defaultItems = [
    { label: "5", value: "Registered Member" },
    { label: "3", value: "Total Active Member" },
    { label: "7", value: "Member A" },
    { label: "12", value: "Valid A" },
];

const tabs = [
    { key: "a_member", label: "AMember" },
    { key: "b_member", label: "BMember" },
    { key: "c_member", label: "CMember" },
];


const tabTitleToIndex = {
  LabelA: 0,
  LabelB: 1,
  LabelC: 2,
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CombinedSkeleton = () => {
  return (
    <>
      <StatPanelSkeleton cards={4} panels={1} />
      <TabsSkeleton count={4} />
    </>
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

    //await delay(1000 * 3);

    const response = await apiClient.get(API_ROUTES.MEMBER_SUMMARY, { params });

    // ✅ Map your response as needed
    const data = response.data;
    setMembers(data.memembers);
    // console.log("MEMBER_DATA: ", data);
    const transformedItems = [
      { label: data.totalShare || "0", value: "All Rebates" },
      { label: data.memberA || "0", value: "Rebate A" },
      { label: data.memberB || "0", value: "Rebate B" },
      { label: data.memberC || "0", value: "Rebate C" },
    ];

    return transformedItems || [];
  };

  return (
    <div className="date-filter-container" style={{padding: '1rem', minHeight: '100vh'}}>
      
      <DateFilter onDateChange={(range) => setDateRange(range)} />

      
      <DataContainer
        fetchData={fetchMemberSummary}
        dependencies={[dateRange]}
        noDataMessage="No Data found"
        loadingComponent={<CombinedSkeleton/>}
        renderData={(items) => (
          <>
            <StatPanel key="1" items={items} />

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          </>
        )}
      />

       {/* <TabContainer activeIndex={activeTabIndex} onTabChange={setActiveTabIndex}>
                <Tab title="LabelA"> 
                  <div className="member-list">
                    {members
                    ?.filter(m => m.related === "A")
                    .map(m => (
                        // <div key={m.userId} className="member-row">
                        // <span className="member-name">{m.name}</span>
                        // <span className="member-share">{m.share}</span>
                        // </div>
                        
                        <RecentItem
                            key={m.userId}
                            title={m.name}
                            description="sasaasasasa"
                            amount={m.share}
                        />
                    ))}
                    </div>
                </Tab>
                <Tab title="LabelB">                 
                   
                  <div className="member-list">
                    {members
                    ?.filter(m => m.related === "B")
                    .map(m => (
                        <div key={m.userId} className="member-row">
                        <span className="member-name">{m.name}</span>
                        <span className="member-share">{m.share}</span>
                        </div>
                    ))}
                    </div>
                </Tab>
                <Tab title="LabelC"> 
                   
                  <div className="member-list">
                    {members
                    ?.filter(m => m.related === "C")
                    .map(m => (
                        <div key={m.userId} className="member-row">
                        <span className="member-name">{m.name}</span>
                        <span className="member-share">{m.share}</span>
                        </div>
                    ))}
                    </div>
                </Tab>
            </TabContainer> */}

    </div>
  );
}
