import React, { useState, useEffect, useRef } from "react";
// import "./HomeV2.css";

import Image1 from '../../assets/bids1.png';
import Image2 from '../../assets/bids2.png';
import Header from "../../components/header/Header";
import BottomNav from "../../components/bottomnav/BottomNav";
import Carousel from "../../components/carousel/Carousel";
import NavRow from "../../components/navrow/NavRow";
import Tabs from "../../components/tabs/Tabs";
import NftList from "../../components/nftList/NftList";
import TopCollectionList from "../../components/topCollectionList/TopCollectionList";
import FeatureSection from "./feature/FeatureSection";
import BiddingSection from "./bidding/BiddingSection";
import { useNavigate } from "react-router-dom";
import { WEB_ROUTES } from "../../api/apiRoutes";

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
        badge: "Floor: 17.98 ETH",
        value: "160.58",
        change: "-78%",
    },
    {
        rank: 2,
        rankBg: "#b5beca",
        imgSrc: Image2,
        alt: "Chain Hard Art #19",
        title: "Chain Hard Art #19",
        badge: "Floor: 17.98 ETH",
        value: "140.79",
        change: "-56%",
    },
    {
        rank: 3,
        rankBg: "#d19b53",
        imgSrc: Image1,
        alt: "Chain Hard Art #3",
        title: "Chain Hard Art #3",
        badge: "Floor: 17.98 ETH",
        value: "110.64",
        change: "-14%",
    },
    {
        rank: 4,
        rankBg: "#c2bbd2",
        imgSrc: "images/01.jpg",
        alt: "Chain Hard Art #89",
        title: "Chain Hard Art #89",
        badge: "Floor: 17.98 ETH",
        value: "60.04",
        change: "-6%",
    },
];

const navButtons = [
    { icon: "💎", label: "Explore", link: '/explore'},
    { icon: "🎨", label: "Mint",},
    { icon: "🗓️", label: "Reserve", link: '/store' },
    { icon: "⚖️", label: "Govern", },
];


export default function Home() {
    const navigate = useNavigate();
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("all");
    const intervalRef = useRef(null);
    const [nfts, setNfts] = useState([]);

    const tabsData = [
        { id: "all", label: "All", Component: () => <NftList items={nfts.slice(0, 3)} /> },
        { id: "art", label: "Art", Component: NftList },
        { id: "celebrities", label: "Celebrities", Component: NftList },
        { id: "gaming", label: "Gaming", Component: NftList },
        { id: "more", label: "More", Component: NftList },
    ];

    useEffect(() => {
        fetchNfts();
        // intervalRef.current = setInterval(() => {
        //     setActiveCarouselIndex((prev) => (prev + 1) % carouselSlides.length);
        // }, 4000);
        // return () => clearInterval(intervalRef.current);
    }, []);


    const fetchNfts = async () => {
        try{
            const res = await fetch("/api/nfts");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();
            //console.log("NFT_LIST: ", data);
            setNfts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {

        }
    };

    function shuffleArray(array) {
        const shuffled = [...array]; // Clone the array to avoid mutating original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    const handleMoreClick = () => {
        navigate(WEB_ROUTES.EXPLORE);
    }   

    return (
        <div>
            {/* HEADER */}
            <Header />

            {/* CAROUSEL SLIDER */}
            <Carousel slides={carouselSlides} />

            {/* NAV ROW */}
            <NavRow navButtons={navButtons} />

            {/* TABS */}
            <Tabs tabs={tabsData} />

            {/* TOP COLLECTIONS */}
            {/* <TopCollectionList collections={collections} onMoreClick= {handleMoreClick} /> */}
            <TopCollectionList collections={shuffleArray(nfts.slice(3, 10))} onMoreClick= {handleMoreClick} />

            {/* Feature Section */}
            <FeatureSection />

            {/* Stake and Bidding Section */}
            <BiddingSection/>

            {/* BOTTOM NAV */}
            <BottomNav />
        </div>
    );
}
