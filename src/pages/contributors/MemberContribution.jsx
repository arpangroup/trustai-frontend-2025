import React, { useEffect, useState } from "react";
import "./MemberContribution.css";
import StatPanel from "../../components/statPanel/StatPanel";
import DateRangePicker from "../../components/input/datepicker/DateRangePicker";
import Chip from "../../components/chip/Chip";
import { API_ROUTES } from "../../api/apiRoutes";
import apiClient from "../../api/apiClient";

// import TabContainer from "../../../components/tab/TabContainer";
// import Tab from "../../../components/tab/Tab";
import { useLocation } from "react-router";
// import Transaction from "../../../components/transaction/Transaction";
// import MemberCard from "../../../components/card/recentItem/RecentItem";
// import RecentItem from "../../../components/card/recentItem/RecentItem";

const defaultItems = [
    { label: "5", value: "Registered Member" },
    { label: "3", value: "Total Active Member" },
    { label: "7", value: "Member A" },
    { label: "12", value: "Valid A" },
];

const tabTitleToIndex = {
  LabelA: 0,
  LabelB: 1,
  LabelC: 2,
};

export default function MemberContribution() {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedChip, setSelectedChip] = useState("All");
  const [items, setItems] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(() => {
    const index = tabTitleToIndex[location.state?.activeTab] ?? 0;
    return index;
  });
  

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
        setMembers(data.memembers);
        console.log("MEMBER_DATA: ", data);
        const transformedItems = [
          { label: data.totalShare || "0", value: "All Rebates" },
          { label: data.memberA || "0", value: "Rebate A" },
          { label: data.memberB || "0", value: "Rebate B" },
          { label: data.memberC || "0", value: "Rebate C" },
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
      {/* Top Bar with Back Button */}
       {/* <Toolbar
        title="Contribution"
        showBack={true}
        onBack={() => window.history.back()}
      /> */}

      {/* Date Range Picker */}
      <DateRangePicker value={dateRange} onChange={handleDateChange} />

      {/* Chip Filter */}
      <div className="chip-list" style={{marginTop: '2px', paddingLeft: '6px'}}>
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
            <StatPanel key="1" items={items} />
            
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
        )}
      </div>

    </div>
  );
}
