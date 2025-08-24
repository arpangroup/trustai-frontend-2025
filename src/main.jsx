import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext.jsx'

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

  <BrowserRouter>
  <NotificationProvider>
    <App />
  </NotificationProvider>
  </BrowserRouter>
)
