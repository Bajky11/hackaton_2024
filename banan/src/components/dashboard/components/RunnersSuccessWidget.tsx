'use client';

import { Box, Card, CardContent, CardHeader, Typography, useTheme } from '@mui/material'
import React from 'react'
import { RunnerSuccessPieChart } from './graphs/RunnerSuccessPieChart'
import { Job, JobState } from '@/services/runner';


interface IRunnersSuccessWidgetProps {
    title: string;
    subtitle?: string;
    color: string;
    data: Job[];
}

const RunnersSuccessWidget = ({ title, subtitle, color, data }: IRunnersSuccessWidgetProps) => {

    const theme = useTheme();

    const countJobsByState = (jobs: Job[]): Record<JobState, number> => {
        return jobs.reduce((acc, job) => {
            acc[job.state] = (acc[job.state] || 0) + 1;
            return acc;
        }, {
            [JobState.SUCCESS]: 0,
            [JobState.FAILED]: 0,
            [JobState.QUEUED]: 0,
            [JobState.IN_PROGRESS]: 0,
        });
    };

    const [success, failed, queued, inProgress] = Object.values(countJobsByState(data));

    return (
        <Card sx={{
            p: 3,
            pr: 2,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: "100%",
            border: `0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`,
            borderRadius: 1,
            boxShadow: 0
        }}>
            <Box sx={{ display: 'flex', width: "100%" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', pb: !subtitle ? 1.5 : 0, color }}>
                    <Typography variant='h6' sx={{ fontWeight: "bold", color: color, width: "100%" }}>{title}</Typography>
                    {subtitle && <Typography lineHeight={1} variant='caption' sx={{ fontWeight: "bold" }}>{subtitle}</Typography>}
                </Box>
                <Typography variant='h6' sx={{ fontWeight: "bold", width: "100%", display: "flex", justifyContent: "flex-end", pr: 2 }}>{data.length}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>

                <Box sx={{ display: 'flex', width: "100%", mt: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>Success</Typography>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>Failed</Typography>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>In progress</Typography>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>Queued</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: "auto" }}>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>{success}</Typography>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>{failed}</Typography>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>{inProgress}</Typography>
                        <Typography variant='body2' sx={{ fontWeight: "bold" }}>{queued}</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'flex-end', alignItems: "center", width: "100%", pl: 0 }}>
                    <RunnerSuccessPieChart
                        success={success}
                        failed={failed}
                        color={color}
                    />
                    <Typography variant='caption'>Success / Failed</Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default RunnersSuccessWidget