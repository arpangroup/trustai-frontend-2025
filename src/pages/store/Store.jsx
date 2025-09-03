
import React, { useEffect, useState } from "react";
import './Store.css'
import Panel from "../../components/panel/Panel";
import PanelMid from "../../components/panel/PanelMid";
import Tabs from "./tabs/Tabs";
import OrderCard from "../../components/cards/orderCard/OrderCard";
import ReserveNow from "./reserve/ReserveNow";


import Image1 from '../../assets/bids1.png';
import Image2 from '../../assets/bids2.png';
import Image3 from '../../assets/bids3.png';
import Image4 from '../../assets/bids4.png';
import { useLocation } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { API_ROUTES } from "../../api/apiRoutes";
import { CURRENCY_UNIT } from "../../constants/config";
import SoldStakeCard from "../../components/cards/soldStakeCard/SoldStakeCard";
import AlertModal from "../../components/modal/success/AlertModal";
import SellNFTModal from "../../components/modal/sellNft/SellNFTModal";
import StorePageSkeleton from "./skeleton/StorePageSkeleton";
import NoData from "../../components/NoData";


const todayDate = new Date().toISOString().split('T')[0];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


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

const defaultStats = [
  { title: 'Today Earnings', value: '-0.16', color: 'blue' },
  { title: 'Cumulative Income', value: '-105.37', color: 'green' },
  { title: 'Team Benefits', value: '-9.03', color: 'gray' },
  { title: 'Reservation Range', value: '1 ~ 5,000', color: 'orange' },
  { title: 'Wallet Balance', value: '-0.77', color: 'cyan' },
  { title: 'Balance for Reservation', value: '-0.77', color: 'darkblue' },
];

const defaultOrders = [{
  investmentId: 1,
  drawDate: '2025/08/01 03:03:40',
  status: 'Won',
  orderNo: 'R3AE9995033223',
  reservationDate: '(GMT+05:30) 2025/08/01 03:03:28',
  estimatedAmount: '50 ~ 1000',
  itemName: 'GiffgaffApeClub_0021549',
  itemPrice: '177.26',
  imageUrl: 'https://prodimage-dan.treasurefun.xyz/GiffgaffApeClub/GiffgaffApeClub_1470_compre.png'
}];

const formatOrderNo = (reservedAt, reservationId) => {
  const date = new Date(reservedAt);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const paddedId = String(reservationId).padStart(4, '0');
  return `TRST${yyyy}${mm}${dd}${paddedId}`;
};

const tabs = [
    { key: "orders", label: "Orders" },
    { key: "reserve", label: "Reserve Stake" },
    { key: "sell", label: "Sell Stake" },
];

const NFTS = [
    { id: 1, imgSrc: Image1, title: "NoxiousAudience#01...", price: "873.03" },
    { id: 2, imgSrc: Image2, title: "NoxiousAudience#03...", price: "962.39" },
    { id: 3, imgSrc: Image3, title: "NoxiousAudience#04...", price: "857.38" },
    { id: 4, imgSrc: Image4, title: "NoxiousAudience#81...", price: "837.98" }
];


const Store = () => {
    const [activeTab, setActiveTab] = useState("orders");
    const isTest = true;
    
    const [stats, setStats] = useState({});
    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    
    const [isSelling, setIsSelling] = useState(false);
    const [sellData, setSellData] = useState(null); // For passing NFT info to SellNFT Modal
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const todayOrders = orders.filter(item => {
        const reservedAtDate = new Date(item.reservedAt).toISOString().split('T')[0];
        return reservedAtDate === todayDate;
    });


    const showTab = (tab) => {
        setActiveTab(tab);
    };


    useEffect(() => {
        fetchOrderSummary(setStats);
        fetchReservedStakes();
    }, []);

    const handleSellClick = (item) => {
        setSellData(item);
        setIsSelling(true);
    };

    const handleSellStake = async () => {
        const reservationId = sellData?.reservationId;

        try {
            const payload = {
                reservationId,
            };

            const response = await apiClient.post(
                API_ROUTES.RESERVATION_API.SELL_RESERVED_STAKE(reservationId),
                payload
            );
            setIsSelling(false);
            window.location.reload();
            // Optionally: refresh the list or remove sold item from state
        } catch (error) {
            console.error('Error selling stake:', error);
            setErrorMessage(error?.message || 'Failed to sell the stake. Please try again.');
            setErrorModalVisible(true);
        }

    };


    const fetchOrderSummary = async () => {
        setLoading(true);
        setError(null);
        try {
            //await delay(1000 * 10);
            const res = await apiClient.get(API_ROUTES.RESERVATION_API.ORDER_SUMMARY);
            // console.log("RESRVATION: ", res.data);
            setStats(res.data || []);
        } catch (err) {
            console.error('Failed to fetch stake items:', err);
            const message = err?.message || 'Failed to load stake items.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const fetchReservedStakes = async () => {
        setLoading(true);
        try {
            //await delay(1000 * 10);
            //const response = await apiClient.get(API_ROUTES.RESERVATION_API.ACTIVE_ORDERS);
            const response = await apiClient.get(API_ROUTES.RESERVATION_API.ALL_ORDERS);
            //console.log("ORDERS: ", response);
            setOrders(response.data || []);
        } catch (err) {
            console.error('Failed to fetch stake items:', err);
            setError('Failed to load stake items.');
        } finally {
            setLoading(false);
        }
    };


    return (

        <div className="dashboard">
            {loading ? (
                <StorePageSkeleton />
            ) : (
            <>
                {/* Top Panels */}
                <div className="panel-row">
                    <Panel title="Today's Earnings" value={loading ? 'NaN' : stats.todayEarning?.toLocaleString() ?? 0} type="earnings" />
                    <Panel title="Cumulative Income" value={loading ? 'NaN' : stats.cumulativeIncome?.toLocaleString() ?? 0} type="income" />
                </div>

                <div className="panel-row">
                    <PanelMid label="Reservation Range" 
                        value={
                        loading
                            ? 'NaN'
                            : `${stats?.reservationRange?.startPrice?.toLocaleString() ?? 1} ~ ${stats?.reservationRange?.endPrice?.toLocaleString() ?? 5000}`
                        }
                        color="#4cb18d" />
                    <PanelMid label="Wallet Balance" value={loading ? 'NaN' : stats.walletBalance?.toLocaleString() ?? 0} color="#ecb424" />
                    <PanelMid label="Balance for Reservation" value={loading ? 'NaN' : stats.walletBalance?.toLocaleString() ?? 0} color="#eb5555" />
                </div>

                {/* Tabs */}
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />


                {/* Tab Contents */}
                {activeTab === "orders" && (
                    <div className="tab-content" id="tab-today">
                        {!loading && !error && todayOrders?.length === 0 && (
                            <NoData message="No orders found for today." />
                        )}

                        {todayOrders.map((order, index) => (
                            <OrderCard key={index} order={order} currency={order.currencyCode || CURRENCY_UNIT}/>
                        ))}
                    </div>
                )}

                {activeTab === "reserve" && (
                    <div className="tab-content" id="tab-reserve">
                        <ReserveNow                    
                            reservedStakes={orders}
                            onReservedSuccess = {() => fetchReservedStakes()}
                        />
                    </div>
                )}

                {activeTab === "sell" && (
                    <div className="tab-content" id="tab-collection">
                        <div className="tab-content active" id="mystakeContent">
                            {(() => {
                                const unsoldOrders = orders.filter(item => !item.sold);

                                if (unsoldOrders.length === 0) {
                                return <NoData message="No items available for sale." />;
                                }

                                return (
                                <div className="nft-grid">
                                    {unsoldOrders.map((nft, index) => (
                                    <SoldStakeCard 
                                        key={index} 
                                        order={nft}
                                        onSell={() => handleSellClick(nft)} 
                                    />
                                    ))}
                                </div>
                                );
                            })()}

                        </div>
                    </div>
                )}

                {isSelling && sellData && (
                    <SellNFTModal
                    item={sellData}
                    itemName = {sellData.schemaTitle}
                    imageUrl = {sellData.imageUrl}
                    price = {sellData.reservedAmount + sellData.valuationDelta}
                    currency = {CURRENCY_UNIT}
                    handlingFee = {sellData.handlingFee}
                    royalty = {sellData.returnRate}
                    onSell = {handleSellStake}
                    onClose={() => setIsSelling(false)}
                    />
                )}

                {errorModalVisible && (
                    <AlertModal
                        type="warning"
                        title="Sell Failed"
                        onClose={() => setErrorModalVisible(false)}
                        footerButtons={[
                            {
                            label: 'Close',
                            onClick: () => setErrorModalVisible(false),
                            className: 'btn btn-primary',
                            }
                        ]}
                        >
                        <p>{errorMessage}</p>
                    </AlertModal>
                )}
            </>
        )}
    
        </div>
    );
};

export default Store;
