import { Card, Box, Typography, useTheme, IconButton } from '@mui/material'
import { title } from 'process'
import React from 'react'
import RunnerAvailabilityBarChart from './graphs/RunnerAvailabilityBarChart';
import { Runner } from '@/services/runner';
import MenuIcon from '@mui/icons-material/Menu';

const RunnersAvailabilityWidget = ({ runners }: { runners: Runner[] }) => {

    const theme = useTheme();

    return (
        <Card sx={{
            p: 3,
            pr: 2,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: "100%",
            border: `0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`,
            borderRadius: 1,
            boxShadow: 0,
            height: 480
        }}>
            <Box sx={{ display: 'flex', width: "100%", pb: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: "bold", width: "100%" }}>{"Availability of runners"}</Typography>
                <IconButton>
                    <MenuIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                <RunnerAvailabilityBarChart runners={runners} />
            </Box>
        </Card>
    )
}

export default RunnersAvailabilityWidget