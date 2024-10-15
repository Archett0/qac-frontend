import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';

const Topbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: '#fff', boxShadow: 'none', color: '#000', marginBottom: 2 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Topbar
        </Typography>
        <div>
          <IconButton color="inherit">
            <LanguageIcon />
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Avatar alt="User Avatar" src="https://i.pravatar.cc/300" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
