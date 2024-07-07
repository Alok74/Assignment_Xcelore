import React, { useEffect,} from 'react';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../LoginContext.js/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';

const AdminPage = () => {
  const { isLoggedIn, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || userRole !== 'Admin') {
      navigate('/');
    }
  }, [isLoggedIn, userRole, navigate]);

  return (
    <Box>
      <Typography variant="h4">Admin Panel</Typography>
      <UserList />
    </Box>
  );
};

export default AdminPage;
