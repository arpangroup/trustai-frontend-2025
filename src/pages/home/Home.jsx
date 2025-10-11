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
import { API_ROUTES, WEB_ROUTES } from "../../api/apiRoutes";
import HtmlRenderer from "./HtmlRenderer";

// const carouselSlides = [
//     {
//         title: "TrustAI",
//         description: "Explore the next miracle of NFT.",
//         learnText: "LEARN MORE",
//         subText: "TrustAI",
//         imgSrc: Image1,
//         alt: "Banner1",
//     },
//     {
//         title: "Exclusive Drop",
//         description: "Collect rare NFTs today. Limited time only!",
//         learnText: "LEARN MORE",
//         subText: "TrustAI Collection",
//         imgSrc: Image1,
//         alt: "Banner2",
//     },
// ];


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
    const [carouselSlides, setCarouselSlides] = useState([]);
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("all");
    const intervalRef = useRef(null);
    const [nfts, setNfts] = useState([]);
    const [html, setHtml] = useState(null);
    const [css, setCss] = useState(null);

    const tabsData = [
        // { id: "all", label: "all", Component: NftList },
        { id: "all", label: "all", Component: () => <NftList items={nfts.slice(0, 3)} /> },
        { id: "art", label: "Art", Component: () => <NftList items={nfts.slice(3, 6)} /> },
        { id: "celebrities", label: "Celebrities", Component: () => <NftList items={nfts.slice(6, 9)} /> },
        // { id: "gaming", label: "Gaming", Component: () => <NftList items={nfts.slice(9, 12)} /> },
        { id: "more", label: "More", Component: () => <NftList items={nfts.slice(9, 12)} /> },
    ];

    useEffect(() => {
        fetchNfts();
        fetchSliders();
        fetchHtmlContent();
        // intervalRef.current = setInterval(() => {
        //     setActiveCarouselIndex((prev) => (prev + 1) % carouselSlides.length);
        // }, 4000);
        // return () => clearInterval(intervalRef.current);
    }, []);


    const fetchNfts = async () => {
        try{
            const res = await fetch(API_ROUTES.APP.NFTS);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();
            //console.log("NFT_LIST: ", data);
            setNfts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {

        }
    };

    
    const fetchSliders = async () => {
        try{
            const res = await fetch(API_ROUTES.APP.SLIDERS);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();
            //console.log("SLIDERS: ", data);
            const slider = data.filter(s => s.active)[0] || [];
            //console.log("SLIDES: ", slider);

            setCarouselSlides(slider.slides || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {

        }
    };

    
    const fetchHtmlContent = async () => {
        try{
            const res = await fetch(API_ROUTES.APP.HTML_CONTENT);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();
            //console.log("HTML_DATA: ", data);
            
            setHtml(data ? data[0].html || null : null);
            setCss(data ? data[0].css || null : null);
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
            {/* <BiddingSection/> */}

            <HtmlRenderer htmlContent={html} css={css}/>

            {/* BOTTOM NAV */}
            <BottomNav />
        </div>
    );
}
