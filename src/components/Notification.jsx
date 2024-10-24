import React, { useRef, useState, useEffect } from 'react';
import { Paper, BottomNavigation, BottomNavigationAction, ClickAwayListener, Divider, Badge, Typography, IconButton, Button } from '@mui/material';
import { Favorite, QuestionAnswer, Comment } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationItem from './NotificationItem';
import { deleteNotification } from '../services/eventService';

export default function Notification({ open, onClose, notifications, onCountChange }) { 
  //get userid from userprofile
  const userId = "d5a28a89-4772-4a5f-a896-f55b8019c46e"; 
  const panelRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [notificationData, setNotificationData] = useState({
    answer: [],
    like: [],
    comment: [],
    other: []
  });
  const [notificationCount, setNotificationCount] = useState(0); 

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    }).format(date).replace(/\//g, '/'); 
  };

  const handleClickAway = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleNavigationChange = (event, newValue) => {
    setSelectedIndex(newValue);
  };

  const handleDeleteNotifications = async (userId) => {
    try {
      let countToDelete = 0; 

      switch (selectedIndex) {
        case 0:
          countToDelete = notificationData.answer.length; 
          break;
        case 1:
          countToDelete = notificationData.like.length; 
          break;
        case 2:
          countToDelete = notificationData.comment.length; 
          break;
        default:
          break;
      }
      
      await deleteNotification(userId, selectedIndex);

      setNotificationData((prevData) => {
        const updatedData = { ...prevData };
        switch (selectedIndex) {
          case 0:
            updatedData.answer = []; 
            break;
          case 1:
            updatedData.like = []; 
            break;
          case 2:
            updatedData.comment = [];
            break;
          default:
            break;
        }
        return updatedData;
      });

      // update topbar notification number 
      const newCount = notificationCount - countToDelete;
      setNotificationCount(newCount);
      onCountChange(newCount); 
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  useEffect(() => {
    const updatedData = { answer: [], like: [], comment: [] };

    notifications.forEach(({ notificationType, message, sentAt }) => {
      const formattedTime = formatDate(new Date(sentAt));
      switch (notificationType) {
        case 'ANSWER_POSTED':
          updatedData.answer.push({ title: message, time: formattedTime });
          break;
        case 'UPVOTE_RECEIVED':
        case 'DOWNVOTE_RECEIVED':
          updatedData.like.push({ title: message, time: formattedTime });
          break;
        case 'COMMENT_POSTED':
          updatedData.comment.push({ title: message, time: formattedTime });
          break;
        case 'OTHER':
          updatedData.other.push({ title: message, time: formattedTime });
          break;
        default:
          break;
      }
    });

    updatedData.answer.sort((a, b) => new Date(b.time) - new Date(a.time));
    updatedData.like.sort((a, b) => new Date(b.time) - new Date(a.time));
    updatedData.comment.sort((a, b) => new Date(b.time) - new Date(a.time));

    setNotificationData(updatedData);

    const totalCount = updatedData.answer.length + updatedData.like.length + updatedData.comment.length;
    setNotificationCount(totalCount); 
    onCountChange(totalCount); 
  }, [notifications]);

  if (!open) return null;

  const renderEmptyNotification = () => (
    <div style={{ textAlign: 'center', padding: '20px', marginTop: '10vh' }}>
      <IconButton disabled>
        <NotificationsIcon style={{ fontSize: '50px', color: 'gray' }} />
      </IconButton>
      <Typography variant="body2" color="textSecondary">No Notification</Typography>
    </div>
  );

  const renderNotifications = (type) => (
    notificationData[type].length > 0
      ? notificationData[type].map((item, index) => (
          <NotificationItem 
            key={index} 
            title={item.title} 
            time={item.time} 
            type={type} 
          />
        ))
      : renderEmptyNotification()
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div style={{ position: 'relative' }}>
        <Paper
          ref={panelRef}
          sx={{
            position: 'fixed',
            top: '8%',
            right: '1.2%',
            width: '360px',
            height: '60vh',
            zIndex: 1200,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <BottomNavigation
            value={selectedIndex}
            onChange={handleNavigationChange}
            sx={{ paddingY: 1, marginTop: 0.5 }}
          >
            <BottomNavigationAction 
              label="Answers" 
              icon={
                <Badge badgeContent={notificationData.answer.length} color="error">
                  <QuestionAnswer />
                </Badge>
              } 
              value={0}
            />            

            <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
            <BottomNavigationAction 
              label="Likes" 
              icon={
                <Badge badgeContent={notificationData.like.length} color="error">
                  <Favorite />
                </Badge>
              }
              value={1}
            />
            <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
            <BottomNavigationAction 
              label="Comments" 
              icon={
                <Badge badgeContent={notificationData.comment.length} color="error">
                  <Comment />
                </Badge>
              }
              value={2}
            />
          </BottomNavigation>

          <Divider />

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {selectedIndex === 0 && renderNotifications('answer')}
            {selectedIndex === 1 && renderNotifications('like')}
            {selectedIndex === 2 && renderNotifications('comment')}
          </div>

          <Divider />
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ margin: 1 }} 
            onClick={() => handleDeleteNotifications(userId)} 
          >
            Delete Notifications
          </Button>
        </Paper>
      </div>
    </ClickAwayListener>
  );
}
