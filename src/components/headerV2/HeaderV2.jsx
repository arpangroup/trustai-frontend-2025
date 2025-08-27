import React from "react";

import './HeaderV2.css';
import { FaRegBell } from "react-icons/fa";
import { FaEllipsisV } from 'react-icons/fa';

const HeaderV2 = () => {
  return (
    <div className="headerWhite">
      <div className="logo">
        <div className="logoIcon"></div>
        <div className="logoText">
          Trust<span style={{ color: "#46dbff" }}>AI</span>
        </div>
      </div>

      <div className="headerTitle">Reserve</div>

      <div className="headerIcons">
        {/* Alarm Icon */}
       <FaRegBell size={24}/>

        {/* More Vert Icon */}
        {/* <svg className="headerIcon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8a2 2 0 1 0 .001-4.001A2 2 0 0 0 12 8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 12 16z"/>
        </svg> */}
        <FaEllipsisV size={20}/>
      </div>
    </div>
  );
};

export default HeaderV2;
