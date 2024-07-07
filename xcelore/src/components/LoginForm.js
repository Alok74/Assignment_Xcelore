import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../LoginContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', {
        email,
        password,
      });
      // console.log(response);
      const userData = response.data;
      login(userData);
      navigate('/Homepage');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 3, 
        maxWidth: 400, 
        margin: 'auto', 
        mt: 5, 
        p: 3, 
        border: '1px solid #ccc', 
        borderRadius: 4, 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <Typography variant="h4" component="h1" align="center">Login</Typography>
      <TextField 
        label="Email" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        fullWidth 
      />
      <TextField 
        label="Password" 
        type={showPassword ? 'text' : 'password'} 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        fullWidth 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handlePasswordToggle}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
