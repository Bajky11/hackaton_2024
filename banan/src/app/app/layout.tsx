'use client';

import * as React from 'react';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme, useColorScheme, useTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { Box } from '@mui/material';
import UserSection from '@/components/UserSection/UserSection';
import LayoutWrapper from './LayoutWrapper';

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
    segment: 'app/automations',
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
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
});

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { colorScheme } = useColorScheme();
  const theme = useTheme();

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
        sx={{
          height: "100%",
          minHeight: "100vh",
        }}
        sidebarExpandedWidth={220}
        slots={{
          toolbarActions: UserSection,
        }}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </DashboardLayout>
    </AppProvider>
  );
}

export default AppLayout;
