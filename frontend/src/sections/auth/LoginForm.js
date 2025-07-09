import React, { useState } from 'react';
import axios from 'axios';
import { Button, Stack, TextField, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

const LoginForm = ({ onLoginSuccess, onLoginError }) => {
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login',
        {
          "email": emailAddress,
          "password": password,
          "returnSecureToken": true
        }
        ,
        { headers: { 'Content-Type': 'application/json' } }
      );
      const user = response.data;
      onLoginSuccess(user.role);
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("token", user.token)
    } catch (error) {
      console.error('Login error:', error);
      onLoginError(error);
    }
  };

  return (
    <>
      <Box sx={{ position: 'absolute', top: -100, left: -100 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
