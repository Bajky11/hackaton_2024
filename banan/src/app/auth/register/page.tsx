'use client';

import {
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/functions/auth/register';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/app/parts/auth';

function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Hesla se neshodují');
      return;
    }

    register(name, email, password)
      .then((user) => {
        dispatch(setUser(user));
        router.push('/app/dashboard');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Stack gap={3}>
      <Stack component={Paper} elevation={3} gap={2} p={4}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Registrace
        </Typography>
        <TextField
          label="Jméno"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Heslo"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Potvrdit heslo"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
        >
          Zaregistrovat se
        </Button>
        <Typography textAlign="center">
          Už máte účet?
          <Link component={NextLink} href="/auth/login" color="primary">
            Přihlaste se
          </Link>
        </Typography>
      </Stack>
    </Stack>
  );
}

export default RegisterPage;
