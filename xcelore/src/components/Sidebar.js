import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'primary.main', color: 'white' },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/user-profile">
            <ListItemIcon sx={{ color: 'white' }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="User Profile" />
          </ListItem>
          <ListItem button component={Link} to="/address">
            <ListItemIcon sx={{ color: 'white' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Address" />
          </ListItem>
          <ListItem button component={Link} to="/settings">
            <ListItemIcon sx={{ color: 'white' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
