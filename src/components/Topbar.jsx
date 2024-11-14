import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import Notification from './Notification';
import { fetchNotifications, connectWebSocket } from '../services/eventService';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const token = localStorage.getItem('jwtToken');
  let userId;

  if (token) {
    const decodeToken = jwtDecode(token);
    userId = decodeToken.sub;
  } else {
    console.error('No JWT token found');
  }

  const getNotifications = async () => {
    try {
      const fetchedNotifications = await fetchNotifications(userId);
      setNotifications(fetchedNotifications);
      setNotificationCount(fetchedNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    getNotifications();

    const disconnect = connectWebSocket(userId, setNotifications);

    return () => {
      disconnect();
    };
  }, [userId]);

  const handleNotificationOpen = () => {
    setOpen(true);
  };

  const handleNotificationClose = () => {
    setOpen(false);
  };

  const handleCountChange = (newCount) => {
    setNotificationCount(newCount);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#fff', boxShadow: 'none', color: '#000', marginBottom: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <IconButton color="inherit" onClick={handleNotificationOpen} sx={{ mr: 3 }}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Notification 
            open={open} 
            onClose={handleNotificationClose} 
            notifications={notifications} 
            onCountChange={handleCountChange} 
            onDelete={getNotifications} 
          />
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <LanguageIcon />
          </IconButton>
          {/* 添加 Link 组件以便点击头像导航到 My Account 页面 */}
          <IconButton component={Link} to="/myaccount" color="inherit" sx={{ mr: 2 }}>
            <Avatar alt="User Avatar" src="https://i.pravatar.cc/300" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
