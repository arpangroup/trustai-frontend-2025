import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/Navbar'
import BottomNav from './components/bottomnav/BottomNav'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgot', '/tree', '/verify'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar/>}

      {/* Apply top margin only if Navbar is visible */}
      <div style={{ marginTop: showNavbar ? '60px' : '0' }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home/>} />

        </Routes>
        
      </div>
       {/* <Footer/> */}
        {showNavbar && <BottomNav/>}
    </div>
  )
}

export default App
