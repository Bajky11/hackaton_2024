'use client';

import { Box, Grid2 } from '@mui/material'
import React from 'react'

interface ILayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
    return (
        <Box sx={{ p: 2 }}>
            {children}
        </Box>
    )
}

export default Layout