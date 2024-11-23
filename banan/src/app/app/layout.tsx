'use client';

import * as React from 'react';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppsIcon from '@mui/icons-material/Apps';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { usePathname, useRouter } from 'next/navigation';

const NAVIGATION: Navigation = [
  {
    segment: 'app/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'app/sas',
    title: 'SAS',
    icon: <AppsIcon />,
  },
  {
    segment: 'app/runners',
    title: 'Runners',
    icon: <LeaderboardIcon />,
  },
  {
    segment: 'app/automationsV2',
    title: 'Automations',
    icon: <MotionPhotosAutoIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="/snap_logo.png" alt="App logo" />,
        title: 'SNAP',
      }}
      router={{
        pathname,
        navigate: (path) => router.push(path),
      }}
      theme={demoTheme}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
}

export default AppLayout;
