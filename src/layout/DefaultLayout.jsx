import React, { useState } from 'react';
import HeaderV2 from "../components/headerV2/HeaderV2";
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/bottomnav/BottomNav';

const DefaultLayout = () => {
  return (
    <div className='main' style={{overflowY: 'hidden'}}>
      <HeaderV2/> 
      <div style={{ paddingTop: '64px' }}>
        <Outlet /> {/* This will render matched route component */}
      </div>
      <BottomNav/>
    </div>
  );
};

export default DefaultLayout;