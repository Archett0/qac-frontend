import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Box, IconButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArticleIcon from '@mui/icons-material/Article';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Sidebar.css';

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(true); // Control sidebar collapse
  const [questionsOpen, setQuestionsOpen] = useState(false); // Control questions submenu

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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleQuestionsClick = () => {
    setQuestionsOpen(!questionsOpen);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: open ? 240 : 60, boxSizing: 'border-box', transition: 'width 0.3s' },
      }}
    >
      <Box className="sidebar-content" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Collapse Button */}
        <IconButton onClick={toggleDrawer} sx={{ alignSelf: open ? 'flex-end' : 'center', margin: '10px' }}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>

        {/* Logo or avatar */}
        <Box className="sidebar-logo" sx={{ display: 'flex', justifyContent: 'center', padding: '2vw 0' }}>
          <Avatar alt="Logo" src="https://i.pravatar.cc/150?img=10" sx={{ width: '7vw', height: '7vw' }} />
        </Box>

        {/* Menu */}
        <Box className="sidebar-menu" sx={{ marginTop: '10vh', paddingBottom: '10px' }}>
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              onClick={(e) => handleListItemClick(0, e)}
              className={`list-item ${selectedIndex === 0 ? 'selected' : ''}`}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Dashboard" />}
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/users"
              onClick={(e) => handleListItemClick(1, e)}
              className={`list-item ${selectedIndex === 1 ? 'selected' : ''}`}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Users" />}
            </ListItem>

            {/* Questions Submenu */}
            <ListItem button onClick={handleQuestionsClick} className={`list-item ${selectedIndex === 2 ? 'selected' : ''}`}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Questions" />}
              {open && (questionsOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            <Collapse in={questionsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to="/questions/list"
                  onClick={(e) => handleListItemClick(3, e)}
                  className={`list-item ${selectedIndex === 3 ? 'selected' : ''}`}
                >
                  <ListItemText inset primary="List" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/questions/create"
                  onClick={(e) => handleListItemClick(4, e)}
                  className={`list-item ${selectedIndex === 4 ? 'selected' : ''}`}
                >
                  <ListItemText inset primary="Create" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              component={Link}
              to="/signout"
              onClick={(e) => handleListItemClick(7, e)}
              className={`list-item ${selectedIndex === 7 ? 'selected' : ''}`}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Sign out" />}
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
