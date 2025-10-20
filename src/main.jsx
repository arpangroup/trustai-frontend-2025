import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'
import { ConfigProvider } from './context/ConfigContext.jsx'
import { registerSW } from 'virtual:pwa-register'


// 👇 optional: configure SW behavior (auto update/offline ready)
registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();          // Prevent Chrome's automatic prompt
  deferredPrompt = e;          // Save the event for later
  installBtn.style.display = 'block'; // Show the button

  installBtn.addEventListener('click', async () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();   // Show the prompt
    const choice = await deferredPrompt.userChoice;
    deferredPrompt = null;
  });
});


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
          <ConfigProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </ConfigProvider>
        </AuthProvider>
      </BrowserRouter>
    </SkeletonTheme>
  // </React.StrictMode>
)
