import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link as RouterLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { handleRegister } from '../services/userService';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => handleRegister(e, email, password, username); // 回调函数形式

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
        Register
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          margin="normal"
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login" underline="hover">
            Sign in
          </Link>
        </Typography>

        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
}

export default Register;
