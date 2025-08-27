
import React, { useState } from "react";
import './Store.css'
import Panel from "../../components/panel/Panel";
import PanelMid from "../../components/panel/PanelMid";
import Tabs from "./tabs/Tabs";
import OrderCard from "../../components/cards/orderCard/OrderCard";
import ReserveStake from "./reserve/ReserveStake";
import NFTGrid from "../../components/nftGrid/NFTGrid";


import Image1 from '../../assets/bids1.png';
import Image2 from '../../assets/bids2.png';
import Image3 from '../../assets/bids3.png';
import Image4 from '../../assets/bids4.png';

const orders = [
    {
        number: "192243555000402432",
        status: "Won",
        date: "2025-05-14 00:35:28",
        reservation: "50 - 1000",
        image: Image1,
        title: "Penguin_Pals_24016",
        price: "55.68807335",
    },
    {
        number: "1922102924427812864",
        status: "Won",
        date: "2025-05-13 02:33:43",
        reservation: "50 - 1000",
        image: Image2,
        title: "NoxiousAudience_12621",
        price: "54.14",
    },
];

  const NFTS = [
    { id: 1, imgSrc: Image1, title: "NoxiousAudience#01...", price: "873.03" },
    { id: 2, imgSrc: Image2, title: "NoxiousAudience#03...", price: "962.39" },
    { id: 3, imgSrc: Image3, title: "NoxiousAudience#04...", price: "857.38" },
    { id: 4, imgSrc: Image4, title: "NoxiousAudience#81...", price: "837.98" }
  ];

const Store = () => {
    const [activeTab, setActiveTab] = useState("orders");

    const tabs = [
        { key: "orders", label: "Orders" },
        { key: "reserve", label: "Reserve Stake" },
        { key: "sell", label: "Sell Stake" },
    ];

    const showTab = (tab) => {
        setActiveTab(tab);
    };

    return (

        <div className="dashboard">

            {/* Top Panels */}
            <div className="panel-row">
                <Panel title="Today's Earnings" value="0" type="earnings" />
                <Panel title="Cumulative Income" value="34.71332532" type="income" />
            </div>

            <div className="panel-row">
                <PanelMid label="Reservation Range" value="50 - 2,000" color="#4cb18d" />
                <PanelMid label="Wallet Balance" value="0" color="#ecb424" />
                <PanelMid label="Balance for Reservation" value="0" color="#eb5555" />
            </div>

            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />


            {/* Tab Contents */}
            {activeTab === "orders" && (
                <div className="tab-content" id="tab-today">
                    {orders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>
            )}

            {activeTab === "reserve" && (
                <div className="tab-content" id="tab-reserve">
                    <ReserveStake/>
                </div>
            )}

            {activeTab === "sell" && (
                <div className="tab-content" id="tab-collection">
                    <div className="tab-content active" id="mystakeContent">
                        <NFTGrid nfts={NFTS} />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Store;
