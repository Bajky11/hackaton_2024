'use client';

import React from 'react';
import { Box } from '@mui/material';

function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {children}
    </Box>
  );
}

export default AuthLayout;
