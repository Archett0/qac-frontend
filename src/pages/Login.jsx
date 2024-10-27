import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { handleLogin } from '../services/userService';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(e, username, password);
  };

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
        Don’t have an account?{' '}
        <Link href="#" underline="hover">
          Get started
        </Link>
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email address"
          type="email"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

      </form>
    </Box>
  );
}

export default LoginPage;
