import React from "react";

import './BackToolbar.css';
import { FaChevronLeft } from "react-icons/fa";

const BackToolbar = ({title = 'Back'}) => {

  const handleBack = () => {
    window.history.back(); 
  }

  return (
    <div className="headerWhite">
      <FaChevronLeft className="back-icon" onClick={handleBack} />

      <div className="headerTitle">{title}</div>
    </div>
  );
};

export default BackToolbar;
