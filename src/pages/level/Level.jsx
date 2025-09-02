import React from 'react';
import './level.css'


const Level = () => {

  // return <div>
  // <Header />
  // </div>;

  return (
    <div >
      <div className="section__padding">
        <div className="card-content">
          <div className="card-left">
            <h1>Level3</h1>
            <button className="load-more-button">Upgrade</button>
          </div>
          <div className="card-right">
            <img src="https://image.treasurenft.xyz/NewVer2212/img/badges_lv3.png" alt="badge" />
          </div>
        </div>
      </div>

      <div className='options'>
        <div className="card-sections">
          <div className="card-section" style={{ marginLeft: '-24px' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="mission" />
            <h4>Mission</h4>
          </div>
          <div className="card-section">
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077046.png" alt="illustrate" />
            <h4>Illustrate</h4>
          </div>
          <div className="card-section">
            <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" alt="achievement" />
            <h4>Achievement</h4>
          </div>
        </div>
        
        <div className="card-sections">
          <div className="card-section" style={{ marginLeft: '-24px' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="mission" />
            <h4>Mission</h4>
          </div>
          <div className="card-section">
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077046.png" alt="illustrate" />
            <h4>Illustrate</h4>
          </div>
          <div className="card-section">
            <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" alt="achievement" />
            <h4>Achievement</h4>
          </div>
        </div>

      </div>




    </div>
  );
};

export default Level;
