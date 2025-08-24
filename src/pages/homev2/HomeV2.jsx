import React, { useState, useEffect, useRef } from "react";
import "./HomeV2.css";

import Image1 from '../../assets/bids1.png';
import Image2 from '../../assets/bids2.png';
import HeaderV1 from "../../components/headerV1/HeaderV1";
import BottomNav from "../../components/bottomnav/BottomNav";
import Carousel from "../../components/carousel/Carousel";
import NavRow from "../../components/navrow/NavRow";
import Tabs from "../../components/tabs/Tabs";
import NftList from "../../components/NftList/NftList";
import TopCollectionList from "../../components/topCollectionList/TopCollectionList";

const carouselSlides = [
    {
        title: "TrustAI",
        desc: "Explore the next miracle of NFT.",
        learnText: "LEARN MORE",
        subText: "TrustAI",
        imgSrc: Image1,
        alt: "Banner1",
    },
    {
        title: "Exclusive Drop",
        desc: "Collect rare NFTs today. Limited time only!",
        learnText: "LEARN MORE",
        subText: "TrustAI Collection",
        imgSrc: Image1,
        alt: "Banner2",
    },
];


const collections = [
    {
        rank: 1,
        rankBg: "linear-gradient(135deg, #ffbb4c 55%, #f5831f)",
        imgSrc: Image1,
        alt: "Chain Hard Art #29",
        title: "Chain Hard Art #29",
        floor: "Floor: 17.98 ETH",
        value: "160.58",
        change: "-78%",
    },
    {
        rank: 2,
        rankBg: "#b5beca",
        imgSrc: Image2,
        alt: "Chain Hard Art #19",
        title: "Chain Hard Art #19",
        floor: "Floor: 17.98 ETH",
        value: "140.79",
        change: "-56%",
    },
    {
        rank: 3,
        rankBg: "#d19b53",
        imgSrc: Image1,
        alt: "Chain Hard Art #3",
        title: "Chain Hard Art #3",
        floor: "Floor: 17.98 ETH",
        value: "110.64",
        change: "-14%",
    },
    {
        rank: 4,
        rankBg: "#c2bbd2",
        imgSrc: "images/01.jpg",
        alt: "Chain Hard Art #89",
        title: "Chain Hard Art #89",
        floor: "Floor: 17.98 ETH",
        value: "60.04",
        change: "-6%",
    },
];

const navButtons = [
    { icon: "💎", label: "Stake" },
    { icon: "🎨", label: "Mint" },
    { icon: "🗓️", label: "Reserve" },
    { icon: "⚖️", label: "Govern" },
];

const tabsData = [
    { id: "all", label: "All", Component: NftList },
    { id: "art", label: "Art", Component: NftList },
    { id: "celebrities", label: "Celebrities", Component: NftList },
    { id: "gaming", label: "Gaming", Component: NftList },
    { id: "more", label: "More", Component: NftList },
];

export default function HomeV2() {
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("all");
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setActiveCarouselIndex((prev) => (prev + 1) % carouselSlides.length);
        }, 4000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="mobile-container">
            {/* HEADER */}
            <HeaderV1 />

            {/* CAROUSEL SLIDER */}
            <Carousel slides={carouselSlides} />

            {/* NAV ROW */}
            <NavRow navButtons={navButtons} />

            {/* TABS */}
            <Tabs tabs={tabsData} />

            {/* TOP COLLECTIONS */}
            <TopCollectionList collections={collections} />

            {/* BOTTOM NAV */}
            <BottomNav />
        </div>
    );
}
