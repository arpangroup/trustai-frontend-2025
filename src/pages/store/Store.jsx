
import React, { useState } from "react";
import './Store.css'
import HeaderV2 from "../../components/headerV2/HeaderV2";

import Image1 from '../../assets/bids1.png';
import Image2 from '../../assets/bids2.png';

const Store = () => {
    const [activeTab, setActiveTab] = useState("today");

    const showTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
          <HeaderV2/>

            <div className="dashboard">
                <div className="panel-row">
                    <div className="panel earnings">
                        <div className="panel-title">Today's Earnings</div>
                        <div className="panel-value">0</div>
                    </div>
                    <div className="panel income">
                        <div className="panel-title">Cumulative Income</div>
                        <div className="panel-value">34.71332532</div>
                    </div>
                </div>
                <div className="panel-row">
                    <div className="panel-mid">
                        Reservation Range
                        <br />
                        <span style={{ color: "#4cb18d", fontWeight: "500" }}>50 - 2,000</span>
                    </div>
                    <div className="panel-mid">
                        Wallet Balance
                        <br />
                        <span style={{ color: "#ecb424", fontWeight: "500" }}>0</span>
                    </div>
                    <div className="panel-mid">
                        Balance for Reservation
                        <br />
                        <span style={{ color: "#eb5555", fontWeight: "500" }}>0</span>
                    </div>
                </div>
                <div className="tabs">
                    <button
                        className={"tab " + (activeTab === "today" ? "active" : "")}
                        onClick={() => showTab("today")}
                    >
                        Today's
                    </button>
                    <button
                        className={"tab " + (activeTab === "reserve" ? "active" : "")}
                        onClick={() => showTab("reserve")}
                    >
                        Reserve
                    </button>
                    <button
                        className={"tab " + (activeTab === "collection" ? "active" : "")}
                        onClick={() => showTab("collection")}
                    >
                        Collection
                    </button>
                </div>
                <div
                    className="tab-content"
                    style={{ display: activeTab === "today" ? "" : "none" }}
                    id="tab-today"
                >
                    <div className="order-card">
                        <div className="order-top">
                            <div className="order-number">
                                Order Number: <span>192243555000402432</span>
                            </div>
                            <div className="order-status">Won</div>
                        </div>
                        <div className="order-date">Reservation Date: 2025-05-14 00:35:28</div>
                        <div className="order-reserve">
                            Reservation Amount{" "}
                            <span style={{ color: "#47cc96" }}>🪙 50 - 1000</span>
                        </div>
                        <div className="nft-row">
                            <img
                                className="nft-img"
                                src={Image1}
                                alt="Penguin Pals"
                                loading="lazy"
                            />
                            <div className="nft-details">
                                <div className="nft-title">Penguin_Pals_24016</div>
                                <div className="nft-price">
                                    Price <span className="nft-currency">🪙</span> 55.68807335
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-card">
                        <div className="order-top">
                            <div className="order-number">
                                Order Number: <span>1922102924427812864</span>
                            </div>
                            <div className="order-status">Won</div>
                        </div>
                        <div className="order-date">Reservation Date: 2025-05-13 02:33:43</div>
                        <div className="order-reserve">
                            Reservation Amount{" "}
                            <span style={{ color: "#47cc96" }}>🪙 50 - 1000</span>
                        </div>
                        <div className="nft-row">
                            <img
                                className="nft-img"
                                src={Image2}
                                alt="Noxious Audience"
                                loading="lazy"
                            />
                            <div className="nft-details">
                                <div className="nft-title">NoxiousAudience_12621</div>
                                <div className="nft-price">
                                    Price <span className="nft-currency">🪙</span> 54.14
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="tab-content"
                    style={{ display: activeTab === "reserve" ? "" : "none" }}
                    id="tab-reserve"
                >
                    <p style={{ color: "#7b8591", fontSize: "1em", marginTop: 0 }}>
                        You have no active reservations. Click the "+" button to start a new
                        one.
                    </p>
                </div>
                <div
                    className="tab-content"
                    style={{ display: activeTab === "collection" ? "" : "none" }}
                    id="tab-collection"
                >
                    <p style={{ color: "#7b8591", fontSize: "1em", marginTop: 0 }}>
                        Your NFT collection will be shown here once available.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Store;
