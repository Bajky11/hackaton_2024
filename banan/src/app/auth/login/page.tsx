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

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //  TODO: Login

    router.push('/app/dashboard');
  };

  return (
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
        <Link component={NextLink} href="/auth/login" color="primary">
          Zaregistrujte se
        </Link>
      </Typography>
    </Stack>
  );
}

export default LoginPage;
