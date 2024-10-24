import React from 'react';
import { Avatar, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CommentList = ({ comments }) => {
  const formatDate = (createdAt) => {
    const commentDate = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - commentDate; 
    
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); 
    const diffInMinutes = Math.floor((diffInMs / (1000 * 60)) % 60); 

    if (diffInMs < 24 * 60 * 60 * 1000) {
      if (diffInHours > 0) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      } else {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      }
    } else {
      return commentDate.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false 
      }).replace(',', '');
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      {comments.map((comment) => (
        <div key={comment.id} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
          <Avatar src={comment.avatar} style={{ marginRight: '10px' }} />
          <div style={{ flex: 1 }}>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>{comment.username}</Typography>
            <Typography variant="body2">{comment.content}</Typography>

            {/* Time and Like */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="textSecondary">
                {formatDate(comment.createdAt)}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton style={{ padding: '5px' }}>
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" style={{ marginLeft: '5px' }}>
                  {12}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
