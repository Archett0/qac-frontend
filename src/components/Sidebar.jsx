import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArticleIcon from '@mui/icons-material/Article';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Sidebar.css';

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index, event) => {
    // Create ripple effect
    const listItem = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = listItem.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    // Append the ripple to the list item
    listItem.appendChild(ripple);

    // Remove the ripple after the animation completes
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });

    // Update the selected state
    setSelectedIndex(index);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: '20vw',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: '20vw', boxSizing: 'border-box' },
      }}
    >
      <Box className="sidebar-content" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Logo or icon at the top */}
        <Box className="sidebar-logo" sx={{ display: 'flex', justifyContent: 'center', padding: '2vw 0' }}>
          <Avatar alt="Logo" src="https://i.pravatar.cc/150?img=10" sx={{ width: '7vw', height: '7vw' }} />
        </Box>

        {/* The menu list starts at 30% height of the page */}
        <Box className="sidebar-menu" sx={{ marginTop: '10vh', paddingBottom: '10px' }}>
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={(e) => handleListItemClick(0, e)}
              className={`list-item ${selectedIndex === 0 ? 'selected' : ''}`}
            >
              <ListItemIcon sx={{ fontSize: '2vw' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ fontSize: '1.2vw' }} />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/users"
              onClick={(e) => handleListItemClick(1, e)}
              className={`list-item ${selectedIndex === 1 ? 'selected' : ''}`}
            >
              <ListItemIcon sx={{ fontSize: '2vw' }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" sx={{ fontSize: '1.2vw' }} />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/questions"
              onClick={(e) => handleListItemClick(2, e)}
              className={`list-item ${selectedIndex === 2 ? 'selected' : ''}`}
            >
              <ListItemIcon sx={{ fontSize: '2vw' }}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Questions" sx={{ fontSize: '1.2vw' }} />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/answers"
              onClick={(e) => handleListItemClick(3, e)}
              className={`list-item ${selectedIndex === 3 ? 'selected' : ''}`}
            >
              <ListItemIcon sx={{ fontSize: '2vw' }}>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Answers" sx={{ fontSize: '1.2vw' }} />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/signout"
              onClick={(e) => handleListItemClick(4, e)}
              className={`list-item ${selectedIndex === 4 ? 'selected' : ''}`}
            >
              <ListItemIcon sx={{ fontSize: '2vw' }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" sx={{ fontSize: '1.2vw' }} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
