// NotificationContext.js
import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/apiRoutes";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await apiClient.get(API_ROUTES.NOTIFICATION_API.NOTIFICATIONS);
      const data = res?.data?.content || [];
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initially + every 60s
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.viewed).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, unreadCount, loading }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
