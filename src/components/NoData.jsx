import React from 'react';

import NoDataIcon from '../assets/icons/icon_no_data.svg';

const NoData = ({ currentTime, message = "No Data Available" }) => (
  <div className="no-data" style={{marginTop: '50px'}}>
    <img
      className="no-data__img"
      src={NoDataIcon}
      alt="No Data"
      loading="lazy"
    />
    <p className="no-data__title">{message}</p>
    <p className="no-data__timestamp">{currentTime}</p>
  </div>
);

export default NoData;
