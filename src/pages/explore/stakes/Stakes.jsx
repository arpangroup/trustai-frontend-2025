import React, { useEffect, useRef, useState } from "react";
import './Stakes.css';
import Tabs from "../tabs/Tabs";
import NoData from "../../../components/NoData";
import { API_ROUTES, WEB_ROUTES } from "../../../api/apiRoutes";
import { CURRENCY_UNIT } from "../../../constants/config";
import apiClient from "../../../api/apiClient";

import Image1 from '../../../assets/bids1.png';
import Image2 from '../../../assets/bids2.png';
import Image3 from '../../../assets/bids3.png';
import Image4 from '../../../assets/bids4.png';
import { useNavigate } from "react-router-dom";
import MyStakeCard from "../../../components/cards/myStakeCard/MyStakeCard";
import MyStakeDetailsBottomSheet from "../../../components/sheet/myStakeDetailsBottomSheet/MyStakeDetailsBottomSheet";
import StakeCard from "../../../components/cards/stakeCard/StakeCard";

// Demo NFT data
const NFTS = [
    { id: 1, imgSrc: Image1, title: "NoxiousAudience#01...", price: "873.03" },
    { id: 2, imgSrc: Image2, title: "NoxiousAudience#03...", price: "962.39" },
    { id: 3, imgSrc: Image3, title: "NoxiousAudience#04...", price: "857.38" },
    { id: 4, imgSrc: Image4, title: "NoxiousAudience#81...", price: "837.98" }
];

export default function Stakes({ initialTab = "stake" }) {
    const [currentTab, setCurrentTab] = useState(initialTab);
    const [showOptions, setShowOptions] = useState(true);
    const [stakes, setStakes] = useState([]);
    const [myStakes, setMyStakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMyStakeDetailsBottomSheetOpen, setIsMyStakeDetailsBottomSheetOpen] = useState(false);
    const [isStakeDetailsOpen, setIsStakeDetailsOpen] = useState(false);
    const [selectedStake, setSelectedStake] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStakes();
        fetchSMytakes();
    }, []);

    const fetchStakes = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiClient.get(API_ROUTES.EXPLORE.STAKE_LIST);
            // const response = stakes;
            //console.log("RESPONSE: ", response);
            setStakes(res.data?.content || []);
        } catch (err) {
            console.error('Failed to fetch stake items:', err);
            setError('Failed to load stake items.');
        } finally {
            setLoading(false);
        }
    };

      const fetchSMytakes = async () => {
        try {
        const res = await apiClient.get(API_ROUTES.EXPLORE.MY_STAKE);
        setMyStakes(res.data?.content || []);
        } catch (err) {
        console.error('Failed to fetch stake items:', err);
        setError('Failed to load stake items.');
        } finally {
        setLoading(false);
        }
    };

    const handleDetailsClick = (stake) => {  
        setSelectedStake(stake);
        setIsMyStakeDetailsBottomSheetOpen(true);
    };


    const TABS = [
        { key: "stake", label: "Stake", id: "tabStake" },
        { key: "mystake", label: "My Stake", id: "tabMyStake" },
        { key: "collection", label: "Collection", id: "tabCollection" }
    ];

    // Refs for highlights
    const menuHighlightRef = useRef(null);
    const tabHighlightRef = useRef(null);
    const headerMenuRef = useRef(null);

    return (
        <div className="header-tab-content active" id="stake">
            <div>
                <Tabs
                    tabs={TABS}
                    activeTab={currentTab}
                    onTabChange={setCurrentTab}
                    highlightRef={tabHighlightRef}
                />

                <div id="tabContentArea">
                    {/* Stake Tab Content */}
                    {currentTab === "stake" && (
                        <div className="tab-content stake-tab-content active" id="stakeContent">

                            {loading && <p>Loading stake items...</p>}
                            {error && <p>{error}</p>}

                            {!loading && !error && stakes.length === 0 && (
                                <NoData message="No stake items found." />
                            )}

                            {!loading && !error && (                                
                                <div className="stakes-container">
                                    <div className="stakes-container-card">

                                        {stakes.map((item, index) => (
                                        <StakeCard
                                            key={item.id || index}
                                            image={item.imageUrl}
                                            title={item.title}
                                            price={item.price}
                                            currency={CURRENCY_UNIT}
                                            likes={item.totalReturnPeriods} // or any other available metric
                                            onClick={() => navigate(`${WEB_ROUTES.STAKE_DETAILS}/${item.id}`)}
                                        />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* MyStake Tab Content */}
                    {currentTab === "mystake" && (
                        <div className="tab-content active" id="mystakeContent" style={{ padding: '8px 16px 16px 16px' }}>
                            <div className='mystake-list'>
                                {!loading && !error && myStakes.map((item, index) => (
                                <MyStakeCard
                                    key={item.investmentId || index}
                                    {...item}
                                    currency={item.currencyCode || CURRENCY_UNIT}
                                    onDetailsClick={() => handleDetailsClick(item)}
                                />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Collection Tab Content */}
                    {currentTab === "collection" && (
                        <div className="tab-content active" id="collectionContent">
                            <NoData />
                        </div>
                    )}
                </div>
            </div>
           <MyStakeDetailsBottomSheet
                isOpen={isMyStakeDetailsBottomSheetOpen}
                onClose={() => setIsMyStakeDetailsBottomSheetOpen(false)}
                {...selectedStake}
            />
            
        </div>
    );
}
