import React, { useEffect, useState, useCallback } from 'react';
import App from './App';
import ErrorPage from './pages/error/ErrorPage';
import { checkBackendStatus } from './api/backendStatus';

const AppWrapper = () => {
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [checking, setChecking] = useState(true);

  const pingBackend = useCallback(async () => {
    setChecking(true);
    const status = await checkBackendStatus();
    setBackendAvailable(status);
    setChecking(false);
  }, []);

    // Initial check only once on page load
    useEffect(() => {
      pingBackend(); // run once on load
    }, [pingBackend]);

  // Initial check and auto-retry every 10 seconds
  // useEffect(() => {
  //   pingBackend(); // initial check
  //   const interval = setInterval(() => {
  //     pingBackend(); // retry every 10s
  //   }, 10000);

  //   return () => clearInterval(interval); // cleanup
  // }, [pingBackend]);

  if (checking) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Checking backend connection...</div>;
  }

  if (!backendAvailable) {
    return <ErrorPage onRetry={pingBackend} />;
  }

  return <App />;
};

export default AppWrapper;
