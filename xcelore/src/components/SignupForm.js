import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");   
    try {
      const payload = { firstName, lastName, email, password };
      console.log("Payload:", payload);
      
      const response = await fetch('http://localhost:4000/api/v1/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log("User Login");

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Server Error Response:", errorData);
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to register');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>Sign Up</Typography>
          <TextField 
            label="First Name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
            fullWidth 
          />
          <TextField 
            label="Last Name" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
            fullWidth 
          />
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
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            fullWidth 
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2, py: 1.5 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupForm;
