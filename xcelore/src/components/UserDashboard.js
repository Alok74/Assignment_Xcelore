import React from 'react';
import { Box, Typography, Button, Container, Paper, Avatar } from '@mui/material';
import { useAuth } from '../LoginContext';
import { deepOrange } from '@mui/material/colors';

const UserDashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ bgcolor: deepOrange[500], width: 80, height: 80, mb: 2 }}>
          {user.firstName[0]}
        </Avatar>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {user.email}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              px: 4,
              py: 1.5,
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDashboard;
