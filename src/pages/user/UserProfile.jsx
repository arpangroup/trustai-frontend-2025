
import React, { useEffect, useState } from 'react';
import './UserProfile.css'

import { FaUsers, FaUserCheck, FaUserFriends, FaUserTie, FaHandshake, FaRegListAlt, FaUserPlus, FaUsersCog, FaGavel, FaInfoCircle, FaArrowDown, FaArrowUp, FaShoppingCart, FaGift, FaHandsHelping } from "react-icons/fa";
import { CURRENCY_SYMBOL, CURRENCY_UNIT, RANK_TO_NUMBER_MAP } from '../../constants/config';
import { useNavigate } from 'react-router';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';
import ProfileCard from '../../components/cards/profileCard/ProfileCard';
import ProfitBalanceCard from '../../components/cards/profitBalanceCard/ProfitBalanceCard';
import Panel from './panel/Panel';


const defaulImage = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

const generateRandomString = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const defaultIncomeData = [
    { incomeType: "Comprehensive", daily: 3.37, total: 15007.89 },
    { incomeType: "Reserve", daily: 3.12, total: 7.98 },
    { incomeType: "Team", daily: 0.25, total: 0 },
    { incomeType: "Activity", daily: 0, total: 15000 },
    { incomeType: "Bid", daily: 0, total: 0 },
    { incomeType: "Stake", daily: 0, total: 0 }
]

const INCOME_TYPE_LABEL_MAP = {
    DAILY: "Comprehensive",
    RESERVE: "Reserve",
    TEAM: "Team",
    ACTIVITY: "Activity",
    BID: "Bid",
    STAKE: "Stake",
    REFERRAL: "Referral"
};


const defaultMyTeams = [
    { label: "9.03", value: "Community rewards" },
    { label: "1", value: "Valid Members" },
    { label: "1", value: "A enthusiast" },
    { label: "0", value: "B+C enthusiasts" },
    { label: <FaUsers />, value: "Community enthusiasts" },
    { label: <FaHandsHelping />, value: "Community contributions" },
    { label: <FaShoppingCart />, value: "Community orders" },
    { label: <FaGift />, value: "Referral" },
];

const defaultMyOrders = [
    { label: "5", value: "Orders" },
    { label: "3", value: "Referrals" },
    { label: "7", value: "Contributors" },
    { label: "12", value: "Active Teams" },

    { label: <FaGavel />, value: "My Bid" },
    { label: <FaInfoCircle />, value: "Details" },
    { label: <FaArrowDown />, value: "Deposit" },
    { label: <FaArrowUp />, value: "Withdraw" },
];



export default function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [incomeData, setIncomeData] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [myTeams, setMyTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
        fetchIncomeData();
        fetchMemberSummary();
        fetchOrderSummary();
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

    
    const fetchIncomeData = async () => {
        try {
            const resp = await apiClient.get(API_ROUTES.INCOME_SUMMARY);
            const incomeResponse = resp.data;
            //console.log("INCOME: ", incomeResponse);

            const formattedIncomeData = incomeResponse.map(item => ({
                incomeType: INCOME_TYPE_LABEL_MAP[item.incomeType] || item.incomeType,
                daily: item.todayAmount,             // map todayAmount to daily
                total: item.totalAmount              // map totalAmount to total
            }));

            setIncomeData(formattedIncomeData);
        } catch (err) {
            console.error("Failed to fetch income data:", err);
        }
    };

    const fetchMemberSummary = async () => {
        try {
            const resp = await apiClient.get(API_ROUTES.MEMBER_SUMMARY);
            const memberSummary = resp.data;
            //console.log("MEMBER_SUMMARY: ", memberSummary);

            // === Transform to myTeams format ===
            const transformedMyTeams = [
                { label: memberSummary.totalShare.toString(), value: "Community rewards" },
                { label: memberSummary.totalActive.toString(), value: "Valid Members" },
                { label: memberSummary.memberA.toString(), value: "A enthusiast" },
                { label: (memberSummary.memberB + memberSummary.memberC).toString(), value: "B+C enthusiasts" },
                { label: <FaUsers />, value: "Community enthusiasts", link: "/members" },
                { label: <FaHandsHelping />, value: "Community contributions", link: "/contributions" },
                { label: <FaShoppingCart />, value: "Community orders", link: "/orders" },
                { label: <FaGift />, value: "Referral & Invite", link: "/referral" },
            ];

            setMyTeams(transformedMyTeams);
        } catch (err) {
            console.error("Failed to fetch income data:", err);
        }
    };


    const fetchOrderSummary = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiClient.get(API_ROUTES.RESERVATION_API.ORDER_SUMMARY);
            const orderSummary = res.data;
            //console.log("ORDER_SUMMARY: ", orderSummary);

            // === Transform to myOrders format ===
            const transformedMyOrders = [
                { label: orderSummary.totalOrders, value: "Orders" },
                { label: orderSummary.processingOrders, value: "Processing" },
                { label: orderSummary.boughtOrders, value: "Bought" },
                { label: orderSummary.soldOrders, value: "Sold" },

                { label: <FaGavel />, value: "My Bid", link: "/" },
                { label: <FaInfoCircle />, value: "Details", link: "/contributions" },
                { label: <FaArrowDown />, value: "Deposit", link: "/deposit" },
                { label: <FaArrowUp />, value: "Withdraw", link: "/withdraw" },
            ];
            setMyOrders(transformedMyOrders);
        } catch (err) {
            console.error('Failed to fetch stake items:', err);
            const message = err?.message || 'Failed to load stake items.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleUserClick = () => {

    }


    return (
        <div style={{ padding: '16px' }}>

            {/* Profile Card */}
            <ProfileCard
                username={userInfo.username}
                uuid={userInfo.accountId}
                level={RANK_TO_NUMBER_MAP[userInfo.rankCode]}
                points={userInfo.point}
                profileImage={userInfo.image || defaulImage}
            />

            {/* Profit & Balance Cards */}
            <div className="profit-cards-container">
                <ProfitBalanceCard amount={userInfo.walletBalance} currency={CURRENCY_UNIT} label="Wallet Balance" />
                <ProfitBalanceCard amount={-325.50} currency={CURRENCY_UNIT} label="Today Reservation" />
            </div>



            {/* Income Table */}
            <div className="income_card" style={{ marginBottom: '20px' }}>
                <div className="card_header">
                    <p className="recent-title">Income</p>
                </div>

                <div className="income_table">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Daily Income</th>
                                <th>Total Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeData.map((income) => (
                                <tr
                                    key={income.incomeType}
                                    className="clickable"
                                    onClick={() => handleUserClick(income.incomeType)}
                                >
                                    <td>{income.incomeType}</td>
                                    <td>{income.daily}</td>
                                    <td>{income.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />




                </div>
            </div>

            {/* My Teams Panel */}
             <Panel
                key="1" 
                title = "My Team" 
                items={myTeams}
                actionText=""
            />

            {/* My Orders Panel */}
            <Panel 
                key="2" 
                title = "My Orders" 
                items={myOrders}
                actionText="Check Orders" 
                onActionClick={() => navigate('/orders')}
            />

        </div>
    )
}
