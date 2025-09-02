import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'

createRoot(document.getElementById('root')).render(
  // <StrictMode>

  // <BrowserRouter>
  //   <AuthProvider>
  //     <ContextProvider >
  //       <NotificationProvider>
  //         <App />
  //       </NotificationProvider>
  //     </ContextProvider>
  //   </AuthProvider>
  // </BrowserRouter>

  // <React.StrictMode>

    <SkeletonTheme baseColor="#e2e5e7" highlightColor="#f5f5f5">
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
        <App />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
    </SkeletonTheme>
  // </React.StrictMode>
)
