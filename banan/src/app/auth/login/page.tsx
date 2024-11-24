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
import { login } from '@/functions/auth/login';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/app/parts/auth';
import Cookies from 'js-cookie';

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(email, password)
      .then((user) => {
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        dispatch(setUser(user));
        router.push('/app/dashboard');
      })
      .catch((error) => alert(error.message));
  };

  const handleFastLogin = (email: string, password: string) => {
    login(email, password)
      .then((user) => {
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        dispatch(setUser(user));
        router.push('/app/dashboard');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Stack gap={3}>
      <Stack component={Paper} elevation={3} gap={2} p={4}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Přihlášení
        </Typography>
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Přihlásit se
        </Button>
        <Typography textAlign="center">
          Nemáte účet?
          <Link component={NextLink} href="/auth/register" color="primary">
            Zaregistrujte se
          </Link>
        </Typography>
      </Stack>

      <Stack component={Paper} elevation={3} gap={2} p={4}>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          Rychlé přihlášení
        </Typography>
        <Button onClick={() => handleFastLogin('lukas@example.com', 'admin')}>
          Lukáš Bajer
        </Button>
        <Button onClick={() => handleFastLogin('matej@example.com', 'admin')}>
          Matěj Varga
        </Button>
        <Button onClick={() => handleFastLogin('lucie@example.com', 'admin')}>
          Lucie Scholzová
        </Button>
        <Button onClick={() => handleFastLogin('petr@example.com', 'admin')}>
          Petr Jenicek
        </Button>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
