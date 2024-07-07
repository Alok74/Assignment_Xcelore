import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AppRegistration, LoginOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../LoginContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };
  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" startIcon={<AppRegistration />} onClick={handleSignupClick}>
              Signup
            </Button>
            <Button color="inherit" startIcon={<LoginOutlined />} onClick={handleLoginClick}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
