'use client';

import * as React from 'react';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { Box } from '@mui/material';
import UserSection from '@/components/UserSection/UserSection';

const NAVIGATION: Navigation = [
  {
    segment: 'app/dashboard',
    title: 'Dashboard',
    icon: <DashboardRoundedIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'app/sas',
    title: 'SAS',
    icon: <Inventory2RoundedIcon />,
  },
  {
    segment: 'app/runners',
    title: 'Runners',
    icon: <EngineeringRoundedIcon />,
  },
  {
    segment: 'app/automationsV2',
    title: 'Automations',
    icon: <PrecisionManufacturingRoundedIcon />,
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
      <DashboardLayout
        slots={{
          toolbarActions: UserSection,
        }}
      >
        <Box
          px={{
            xs: 0.5, // Extra small screens
            sm: 4, // Small screens
            md: 6, // Medium screens
            lg: 8, // Large screens
            xl: 10, // Extra large screens
          }}
          p
        >
          {children}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default AppLayout;
