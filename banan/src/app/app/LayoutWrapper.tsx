'use client';

import { Box, useColorScheme, useTheme } from '@mui/material';
import React, { ReactNode } from 'react'

const LayoutWrapper = ({ children }: { children: ReactNode }) => {

    const { colorScheme } = useColorScheme();
    const theme = useTheme();

    return (
        <Box
            // px={{
            //   xs: 0.5, // Extra small screens
            //   sm: 4, // Small screens
            //   md: 6, // Medium screens
            //   lg: 8, // Large screens
            //   xl: 10, // Extra large screens
            // }}
            sx={{
                p: 4,
                backgroundColor: colorScheme === "light" ? "#FAFAFA" : theme.palette.background.paper,
                height: '100%',
                overflow: 'auto',
            }}
        >
            {children}
        </Box>
    )
}

export default LayoutWrapper