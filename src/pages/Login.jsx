import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { handleLogin } from '../services/userService';
import { Link as RouterLink } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('jwtToken', token);
      window.location.href = '/';
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUsername(email);
    
    if (email && !validateEmail(email)) {
      setEmailError('请输入有效的邮箱地址');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(username)) {
      setEmailError('请输入有效的邮箱地址');
      return;
    }
    await handleLogin(e, username, password);
  };

  const hanldeGoogleLogin = () => {
    const clientId = '138827762502-2ruj95b130q8fb3c9gfq6kcnm01una6q.apps.googleusercontent.com';
        const redirectUri = 'http://localhost:8081/api/v1/user/auth/google_login';
        const scope = 'email profile';
        const responseType = 'code';
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
        window.location.href = googleAuthUrl;
  }

  return (
    <Box
      sx={{
        width: 400,
        margin: 'auto',
        marginTop: '100px',
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" component="h1" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Sign in
      </Typography>

      <Typography variant="body2" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/register" underline="hover">
          Get started
        </Link>
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email address"
          type="email"
          fullWidth
          value={username}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          required
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />

        <Link href="#" underline="hover" sx={{ display: 'block', textAlign: 'right', marginBottom: 2 }}>
          Forgot password?
        </Link>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Sign in
        </Button>

        <Button
          onClick={hanldeGoogleLogin}
          variant="contained"
          fullWidth
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Google Login
        </Button>

      </form>
    </Box>
  );
}

export default LoginPage;
