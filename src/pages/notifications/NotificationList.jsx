import React, { useEffect, useState } from 'react';
import NotificationCard from './components/NotificationCard';
import './NotificationList.css';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';
// import Toolbar from '../user/toolbar/Toolbar';
import NoData from '../../components/NoData';
import { useNotifications } from '../../context/NotificationContext';

const dummyNotifications = [
  {
    id: 1,
    title: 'Welcome!',
    message: 'Thanks for joining our platform.',
    createdAt: '2025-08-08T10:00:00Z',
    viewed: false,
  },
  {
    id: 2,
    title: 'System Maintenance',
    message: 'The system will be down from 12 AM to 2 AM.',
    createdAt: '2025-08-07T22:00:00Z',
    viewed: true,
  },
  {
    id: 3,
    title: 'New Feature: Dashboard',
    message: 'Check out the updated dashboard view now!',
    createdAt: '2025-08-06T08:30:00Z',
    viewed: false,
  },
];

export default function NotificationList() {
  const { notifications, setNotifications, loading } = useNotifications();
  //const [ notifications, setNotifications ] = useState(dummyNotifications);
  //const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notifications on component mount
  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await apiClient.get(API_ROUTES.NOTIFICATION_API.NOTIFICATIONS);
  //     const data = response?.data?.content;
  //     console.log("RESPONSE: ", data);
  //     setNotifications(data);
  //   } catch (err) {
  //     console.error('Failed to fetch notifications:', err);
  //     setError('Failed to load notifications');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  /*const markAsViewed = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, viewed: true } : n))
    );
  };
  const handleClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, viewed: true } : n))
    );
  };
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };*/
  
  const markAsViewed = async (id) => {
    try {
      await apiClient.patch(API_ROUTES.NOTIFICATION_API.MARK_VIEWED(id));
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, viewed: true } : n))
      );
    } catch (err) {
      console.error(`Failed to mark notification ${id} as viewed`, err);
    }
  };

  const deleteNotification = async (id) => {
    console.log("Trying to delete ID:", id);
    try {
      await apiClient.delete(API_ROUTES.NOTIFICATION_API.DELETE(id));
      //setNotifications((prev) => prev.filter((n) => n.id !== id));
      setNotifications((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        console.log("After delete, notifications:", updated);
        return updated;
      });
    } catch (err) {
      console.error(`Failed to delete notification ${id}`, err);
    }
  };


  if (loading) {
    return <div className="notification-wrapper">Loading notifications...</div>;
  }

  if (error) {
    return <div className="notification-wrapper error">{error}</div>;
  }

  return (
    <div className="notification-wrapper">
      {/* <h2 className="heading">Notifications</h2> */}
      {/* <Toolbar 
        title="Announcements"        
        onBack={() => window.history.back()}
      /> */}


      {notifications.length === 0 ? (
        // <p>No notifications found.</p>
        <NoData message="No recent announcements"/>
      ) : (
        notifications.map((n) => (
          <NotificationCard
            key={n.id}
            notification={n}
            onClick={markAsViewed}
            onDelete={deleteNotification}
          />
        ))
      )}
    </div>
  );
}
