import { Link, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthSocial from '../../sections/auth/AuthSocial';
import LoginForm from '../../sections/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const handleLoginSuccess = (role) => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("isLoggedIn", "true");
    navigate('/app');
  };

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Login to Road Ready</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New User?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create an account
          </Link>
        </Stack>

        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onLoginError={() => setLoginError(true)}
        />

        <AuthSocial />

        {loginError && (
          <Typography color="error">
            Login failed. Please check your credentials.
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default Login;



