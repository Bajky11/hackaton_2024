'use client';

import { Stack, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

function IndexPage() {
  return (
    <Stack p={1} gap={2}>
      <Typography>Index page</Typography>
      <Link
        component={NextLink}
        href="/auth/login"
        color="inherit"
        underline="none"
      >
        Přihlášení
      </Link>
    </Stack>
  );
}

export default IndexPage;
