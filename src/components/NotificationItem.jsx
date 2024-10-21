import React from 'react';
import { Paper, Divider, Typography } from '@mui/material';

export default function NotificationItem({ title, time, type }) {
  return (
    <Paper
      elevation={0}
      sx={{
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 2,
        maxWidth: '100%', 
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          overflow: 'hidden', 
          display: '-webkit-box', 
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2, 
          maxHeight: '3em', 
        }}
      >
        {title} {time}
      </Typography>
      <Divider  sx={{paddingTop: 2}}/>
    </Paper>
  );
}
