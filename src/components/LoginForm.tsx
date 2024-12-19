'use client'

import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'; // Use Next.js router for redirection
import { useLogin } from '@/apis/userApi';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate: login, isLoading, data } = useLogin();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    let isValid = true;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    }

    if (isValid) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setErrorMessage('');

    login({ email, password }, {
      onSuccess: () => {
        router.push('/');
      },
      onError: () => {
        setErrorMessage(data?.message || '');
      }
    });
  };

  return (
    <div className='p-4 w-full max-w-[400px]'>
      <Typography variant="h3" align="left" gutterBottom>
        Login
      </Typography>

      <p className='mb-4 text-gray-800'>Fill the form below to login!</p>

      {errorMessage && <Typography color="error" variant="body2">{errorMessage}</Typography>}

      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="filled"
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: 'orange' }}
              size='large'
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
