import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import Notification from './Notification';
import { fetchNotifications, connectWebSocket } from '../services/eventService';

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0); 

  useEffect(() => {
    const userId = "d5a28a89-4772-4a5f-a896-f55b8019c46e"; 

    const getNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotifications(userId);
        setNotifications(fetchedNotifications);
        setNotificationCount(fetchedNotifications.length); 
      } catch (error) {
        console.error('Error fetching initial notifications:', error);
      }
    };

    getNotifications(); 

    const disconnect = connectWebSocket(userId, setNotifications); 

    return () => {
      disconnect();
    };
  }, []);

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
            onCountChange={handleCountChange} // 传递回调
          />
          <IconButton color="inherit" sx={{ mr: 2 }}> 
            <LanguageIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Avatar alt="User Avatar" src="https://i.pravatar.cc/300" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
