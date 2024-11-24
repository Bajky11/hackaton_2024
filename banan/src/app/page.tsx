'use client';

import { Stack, Typography, Link, Button } from '@mui/material';
import NextLink from 'next/link';
import Image from 'next/image';

function IndexPage() {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        padding: 2,
      }}
    >
      {/* Logo */}
      <Image
        src="/snap_logo.png" // Nahraďte cestu k logu správnou cestou
        alt="Logo aplikace"
        width={150}
        height={150}
      />

      {/* Název aplikace */}
      <Typography
        variant="h3"
        fontWeight="bold"
        color="primary"
        sx={{ letterSpacing: 2 }}
      >
        System for Networked Automation and Pipelines
      </Typography>

      {/* Tlačítka pro přihlášení a registraci */}
      <Stack direction="row" spacing={2}>
        <Button
          component={NextLink}
          href="/auth/login"
          variant="contained"
          color="primary"
          size="large"
        >
          Přihlášení
        </Button>
        <Button
          component={NextLink}
          href="/auth/register"
          variant="outlined"
          color="primary"
          size="large"
        >
          Registrace
        </Button>
      </Stack>
    </Stack>
  );
}

export default IndexPage;
