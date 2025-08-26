import React, { useState } from 'react';
import HeaderV2 from "../components/headerV2/HeaderV2";
import { Outlet } from 'react-router-dom';
import './MobileLayout.css';

const MobileLayout = () => {
  const [navFolded, setNavFolded] = useState(false);

  const toggleSidebar = () => {
    setNavFolded((prev) => !prev);
  };

  // return (
  //   <div>
  //     <HeaderV2/> 
  //     {/* Your main content */}
  //     <main>
  //       <div className='page-container'>
  //         <Outlet /> {/* This will render matched route component */}
  //       </div>
  //     </main>
  //   </div>
  // );

  return (
    <div className="mobile-container">
      <Outlet /> {/* This will render matched route component */}
    </div>
  );
};

export default MobileLayout;