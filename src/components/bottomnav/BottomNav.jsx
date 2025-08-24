import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './BottomNav.css';

function BottomNav() {
    const [count, setCount] = useState(0);

    return (        
        <div className="layout-footer">
            <div className="footer-nav-outer ivu-row-flex ivu-row-flex-middle">
                <div className="footer-nav-item ivu-col ivu-col-span-sm-24 ivu-col-span-md-24 ivu-col-span-lg-8 ivu-col-span-xl-8">
                    <Link to="/stakes" className="title-grey999-PFR-14">Stake</Link>
                </div>
                <div className="footer-nav-item ivu-col ivu-col-span-sm-24 ivu-col-span-md-24 ivu-col-span-lg-8 ivu-col-span-xl-8">
                    <Link to="/earn" className="title-grey999-PFR-14">Earn</Link>
                </div>
                <div className="footer-nav-item ivu-col ivu-col-span-sm-24 ivu-col-span-md-24 ivu-col-span-lg-8 ivu-col-span-xl-8">
                    <Link to="/reservation" className="title-grey999-PFR-14">Reserve</Link>
                </div>
                <div className="footer-nav-item ivu-col ivu-col-span-sm-24 ivu-col-span-md-24 ivu-col-span-lg-8 ivu-col-span-xl-8">
                    <Link to="/userDetails" className="title-grey999-PFR-14">Account</Link>
                </div>
            </div>
        </div>
    );
}

export default BottomNav;
