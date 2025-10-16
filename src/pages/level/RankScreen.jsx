import React, { useEffect, useState } from 'react';
import './RankScreen.css'; // Ensure this path matches your project structure

import AnimationLoading from "../../assets/animation/loading-animation.json"


import DocumentIcon from '../../assets/icons/document.png'; 
import InfoIcon from '../../assets/icons/infoV1.png'; 
import TrophyIcon from '../../assets/icons/trophy.png'; 
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';
import { RANK_TO_NUMBER_MAP } from '../../constants/config';
import AnimationModal from '../../components/modal/animation/AnimationModal';
import { toast } from 'react-toastify';
import Tabs from '../store/tabs/Tabs';

const tabs = [
  { key: "a_member", label: "AMember", style: { backgroundColor: "#fff" } },
  { key: "b_member", label: "BMember", style: { backgroundColor: "#fff" } },
  { key: "c_member", label: "CMember", style: { backgroundColor: "#fff" } },
];

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


const RankScreen = () => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [members, setMembers] = useState([]);
    const [activeTab, setActiveTab] = useState("a_member");

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    
    useEffect(() => {
        fetchUserDetails();
        fetchMemberSummary();
    }, []);

    
    const fetchUserDetails = async () => {
        try {
            const resp = await apiClient.get(API_ROUTES.USER_INFO);
            //console.log("USER_RESPONSE: ", resp.data);
            setUserInfo(resp.data);
        } catch (err) {
            //setError('Failed to load data');
            //console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMemberSummary = async () => {
        const params = {};

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

    const upgradeRank = async () => {
        setShowLoader(true);
        try {
            const userId = userInfo.id;
            const resp = await apiClient.post(API_ROUTES.EVALUATE_RANK(userId));
            fetchUserDetails();

            await sleep(2000);
            //console.log("UPGRADE_RANK: ", resp.data);
        } catch (err) {
            //setError('Failed to load data');
            //console.error(err);
            toast.error(err.message, {closeButton: false});
        } finally {
            setShowLoader(false);
        }
    }


    return (
        <div className="container">
            <div className="level-card">
                <h2>Level {RANK_TO_NUMBER_MAP[userInfo.rankCode]}</h2>
                <div className="points-bar">
                    <span>Points: 220 / {userInfo.point} (100%)</span>
                    <div className="progress-bar-bg">
                        <div className="progress-bar"></div>
                    </div>
                </div>
                <button className="upgrade-btn" onClick={upgradeRank}>Upgrade</button>
            </div>

            {/* <div className="section-menu">
                <div className="section-menu-item">
                    <img src={DocumentIcon} alt="Mission" />
                    <span>Mission</span>
                </div>
                <div className="section-menu-item">
                    <img src={InfoIcon} alt="Illustrate" />
                    <span>Illustrate</span>
                </div>
                <div className="section-menu-item">
                    <img src={TrophyIcon} alt="Achievement" />
                    <span>Achievement</span>
                </div>
            </div> */}

            {/* <div className="level-box">
                Level 1
                <span className="price-tag">₮ 1 ~ 1000</span>
                <div style={{ clear: 'both' }}></div>
                <div className="price-info">
                    Price Range of Reserved Items
                </div>
            </div> */}

            <div>
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="tab-content" style={{padding: '8px', backgroundColor: '#fff'}}>
                    <MemberList members={getFilteredMembers()} />
                </div>
            </div>

             <AnimationModal
              isOpen={showLoader}
              animationSrc={AnimationLoading}
            //   loopCount={5}
              onClose={() => {
                setShowLoader(false);
                setTimeout(() => setTradingAnimationModal(true), 100);
              }}
            />
        </div>
    );
};

export default RankScreen;
