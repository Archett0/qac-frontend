import React, {useState, useEffect} from 'react';
import {AppBar, Toolbar, IconButton, Badge, Avatar} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import Notification from './Notification';
import {fetchNotifications} from '../services/eventService';
import {Link} from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react";

const Topbar = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [token, setToken] = useState(null);
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    let userId;

    if (user) {
        userId = user['https://your-domain.com/uuid'];
    } else {
        console.error('No JWT token found so no user found');
    }

    const getNotifications = async (token) => {
        try {
            const fetchedNotifications = await fetchNotifications(userId, token);
            setNotifications(fetchedNotifications);
            setNotificationCount(fetchedNotifications.length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const getToken = async () => {
        try {
            const token = await getAccessTokenSilently();
            setToken(token);
        } catch (error) {
            console.error('Error getting token:', error);
        }
    };

    // ENABLE AUTO PULLING
    useEffect(() => {
        getToken();
        getNotifications(token);
    }, [getToken, token, userId]);

    const handleNotificationOpen = () => {
        // getNotifications(token);
        setOpen(true);
    };

    const handleNotificationClose = () => {
        setOpen(false);
    };

    const handleCountChange = (newCount) => {
        setNotificationCount(newCount);
    };

    return (
        <AppBar position="fixed" sx={{backgroundColor: '#fff', boxShadow: 'none', color: '#000', marginBottom: 2}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                    <IconButton color="inherit" onClick={handleNotificationOpen} sx={{mr: 3}}>
                        <Badge badgeContent={notificationCount} color="error">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <Notification
                        open={open}
                        onClose={handleNotificationClose}
                        notifications={notifications}
                        onCountChange={handleCountChange}
                        onDelete={getNotifications}
                    />
                    <IconButton color="inherit" sx={{mr: 2}}>
                        <LanguageIcon/>
                    </IconButton>
                    {/* 添加 Link 组件以便点击头像导航到 My Account 页面 */}
                    <IconButton component={Link} to="/myaccount" color="inherit" sx={{mr: 2}}>
                        <Avatar alt="User Avatar" src="https://i.pravatar.cc/300"/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
