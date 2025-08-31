import React, { useState } from 'react';
import './DefaultLayout.css';
import HeaderV2 from "../components/headerV2/HeaderV2";
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/bottomnav/BottomNav';
import BackToolbar from '../components/toolbar/BackToolbar';

const DefaultLayout = () => {
  const location = useLocation();

  // Paths that should show BackToolbar with their titles
  const toolbarConfig = [
    { path: '/exploreDetails', title: 'Explore Details' },
    { path: '/notifications', title: 'Notifications' },
    { path: '/stakeDetails', title: 'Stake Details' },
    // Add more as needed
  ];


  // Find the first match
  const matchedToolbar = toolbarConfig.find(config =>
    location.pathname.startsWith(config.path)
  );


  return (
    <div className='main-wrapper' style={{overflowY: 'hidden'}}>
      {matchedToolbar 
        ? <BackToolbar title={matchedToolbar.title} />
        : <HeaderV2 />
      }

      <div className='main' style={{ paddingTop: '64px' }}>
        <Outlet /> {/* This will render matched route component */}
      </div>
      <BottomNav/>
    </div>
  );
};

export default DefaultLayout;