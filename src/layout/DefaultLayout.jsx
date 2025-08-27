import React, { useState } from 'react';
import './DefaultLayout.css';
import HeaderV2 from "../components/headerV2/HeaderV2";
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/bottomnav/BottomNav';

const DefaultLayout = () => {
  return (
    <div className='main-wrapper' style={{overflowY: 'hidden'}}>
      <HeaderV2/> 
      <div className='main' style={{ paddingTop: '64px' }}>
        <Outlet /> {/* This will render matched route component */}
      </div>
      <BottomNav/>
    </div>
  );
};

export default DefaultLayout;