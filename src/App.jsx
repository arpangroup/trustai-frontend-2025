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
import ProtectedRoute from './utils/ProtectedRoute';

import Store from './pages/store/Store';
import MobileLayout from './layout/MobileLayout';
import DefaultLayout from './layout/DefaultLayout';
import Explore from './pages/explore/Explore';
import ExploreDetails from './pages/exploreDetails/ExploreDetails';
import Wallet from './pages/wallet/Wallet';
import UserProfile from './pages/user/UserProfile';


function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgot', '/tree', '/verify'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<RegisterForm />} />
        {/* <Route path="/forgot" element={<Forgot />} /> */}

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
            </Route>
          </Route>

        </Route>


      </Routes>
    </>
  )
}

export default App
