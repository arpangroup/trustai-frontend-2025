// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/Navbar'
// import BottomNav from './components/bottomnav/BottomNav'
import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/home/Home'
// import HomeV1 from './pages/homeV1/HomeV1'
import Home from './pages/home/Home'
import Login from './pages/login/Login';
import RegisterForm from './pages/registration/RegisterForm ';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';

import ProtectedRoute from './utils/ProtectedRoute';

import Store from './pages/store/Store';
import MobileLayout from './layout/MobileLayout';
import DefaultLayout from './layout/DefaultLayout';
import Explore from './pages/explore/Explore';
import ExploreDetails from './pages/exploreDetails/ExploreDetails';
import Wallet from './pages/wallet/Wallet';
import UserProfile from './pages/user/UserProfile';
import NotificationList from './pages/notifications/NotificationList';
import Members from './pages/members/Members';
import MemberContribution from './pages/contributors/MemberContribution';
import Orders from './pages/orders/Orders';
import ReferralScreen from './pages/referral/ReferralScreen';
import DepositPage from './pages/deposit/DepositPage';
import WithdrawRequest from './pages/withdraw/WithdrawRequest';
import Level from './pages/level/Level';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountSetting from './pages/setting/AccountSetting';


function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgot', '/tree', '/verify'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/" element={<MobileLayout />}>
          <Route path="" element={<Home />} />



          <Route element={<ProtectedRoute />}>
            <Route element={<DefaultLayout />}>
              <Route path="explore" element={<Explore/>} />
              <Route path="exploreDetails/:id" element={<ExploreDetails/>} />
              <Route path="store" element={<Store />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="assets" element={<Store />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="settings" element={<AccountSetting />} />

              
              <Route path="/members" element={<Members />} />
              <Route path="/contributions" element={<MemberContribution />} /> 
              <Route path="/orders" element={<Orders />} />

              <Route path="/referral" element={<ReferralScreen />} />
              <Route path="/deposit" element={<DepositPage />} />
              <Route path="/withdraw" element={<WithdrawRequest />} />
              <Route path="/level" element={<Level />} />
              {/* <Route path="/tree" element={<MLMTree />} /> */}

              
              <Route path="notifications" element={<NotificationList />} />
            </Route>
          </Route>

        </Route>


      </Routes>

      {/* Add this ONCE, globally */}
      <ToastContainer position="bottom-center" autoClose={3000} />
    </>
  )
}

export default App;
