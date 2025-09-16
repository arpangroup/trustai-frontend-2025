import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/apiRoutes";
import { AuthContext } from "./AuthContext";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchConfig();
  }, []); 

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchConfig();
  //   } else {
  //    loadFronLocalStorage();
  //   }
  // }, [isAuthenticated]); 


  const loadFronLocalStorage = () => {
    // if not logged in, just load from localStorage
    const fallback = {};
    Object.keys(localStorage).forEach((k) => {
      try {
        fallback[k] = JSON.parse(localStorage.getItem(k));
      } catch {
        fallback[k] = localStorage.getItem(k);
      }
    });
    setConfig(fallback);
    setLoading(false);
  }

  const fetchConfig = async () => {
    try {
      const res = await apiClient.get(API_ROUTES.CONFIGS);
      const data = res.data || {};
      setConfig(data);

      // Save to localStorage for caching
      Object.entries(res.data || {}).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    } catch (err) {
      //console.error("Failed to fetch config, using localStorage fallback");

      // fallback: load from localStorage
      const fallback = {};
      Object.keys(localStorage).forEach((k) => {
        try {
          fallback[k] = JSON.parse(localStorage.getItem(k));
        } catch {
          fallback[k] = localStorage.getItem(k);
        }
      });
      setConfig(fallback);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ConfigContext.Provider value={{ config, loading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);


/*
Usages:

import { useConfig } from "../context/ConfigContext";

function Deposit() {
  const { config, loading } = useConfig();

  if (loading) return <p>Loading configs...</p>;

  return (
    <div>
      <p>Deposit Address: {config.DEPOSIT_ADDRESS}</p>
      <p>Currency: {config.CURRENCY_UNIT}</p>
    </div>
  );
}

*/
