'use client';

import RunnersSuccessWidget from '@/components/dashboard/components/RunnersSuccessWidget';
import { useGetJobDetailQuery, useGetRunnerDetailQuery } from '@/services/runner';
import { RootState } from '@/store';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid2,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export default function JobDetail() {
  const { id } = useParams() as { id: string };
  const runnerLog = useSelector((state: RootState) => state.app.runnerLog.runnerLog);

  const jobDetail = useGetJobDetailQuery(id);

  const runnerDetail = useGetRunnerDetailQuery(jobDetail.data ? jobDetail.data.runner : "", {
    skip: !jobDetail.data
  });

  const theme = useTheme();

  const stateColors: { [key: string]: string } = {
    success: '#4BA43A',
    failed: '#BE3B2B',
    queued: '#9E51AE',
    in_progress: '#2C5DDA',
  };

  // Funkce pro získání barvy podle stavu
  const getStateColor = (state: string): string => {
    return stateColors[state] || stateColors.DEFAULT;
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}  >
        <Typography fontSize={30} fontWeight={'bold'} pr={2}>
          Job Detail
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}  >
        <Card sx={{
          p: 3,
          pr: 2,
          display: 'flex',
          gap: 4,
          maxWidth: "100%",
          border: `0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`,
          borderRadius: 1,
          boxShadow: 0
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>Id:</Typography>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>Date:</Typography>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>SAS:</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography variant='body1'>{jobDetail.data?.id}</Typography>
              <Chip
                label={jobDetail.data?.state}
                size='small'
                sx={{
                  backgroundColor: getStateColor(jobDetail.data?.state ?? "success"),
                  color: '#fff',
                }}
              />
            </Box>

            <Typography variant='body1'>{dayjs(jobDetail.data?.timestamp).format('YYYY-M-D HH:mm:ss')}</Typography>
            <Typography variant='body1'>{jobDetail.data?.SAS}</Typography>
          </Box>
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}  >
        <Card sx={{
          p: 3,
          pr: 2,
          display: 'flex',
          gap: 4,
          maxWidth: "100%",
          border: `0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`,
          borderRadius: 1,
          boxShadow: 0
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>RunnerId:</Typography>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>Organization:</Typography>
            <Typography variant='body1' sx={{ fontWeight: "bold" }}>Runner group:</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant='body1'>{runnerDetail.data?.id}</Typography>
            <Typography variant='body1'>{runnerDetail.data?.organization}</Typography>
            <Typography variant='body1'>{runnerDetail.data?.runner_group}</Typography>
          </Box>
        </Card>
      </Grid2>

      <Grid2 size={{ xs: 12, }}  >
        <Card sx={{
          p: 3,
          pr: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          maxWidth: "100%",
          border: `0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`,
          borderRadius: 1,
          boxShadow: 0
        }}>
          <Typography variant='h6' fontWeight={'bold'} pr={2}>
            Runner Output
          </Typography>
          <Typography sx={{
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}>
            {runnerLog.log}
          </Typography>
        </Card>
      </Grid2>

    </Grid2>
    // <Stack spacing={2} flex={1}>
    //   <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
    //     Job Detail
    //   </Typography>
    //   <Stack flexDirection='row' gap={3} flex={1} alignItems='center'>
    //     <Chip
    //       label={jobDetail.data?.state}
    //       sx={{
    //         fontSize: '1rem', // Larger text for the chip
    //         backgroundColor: jobDetail.data?.state ? getChipColor(jobDetail.data.state) : 'grey',
    //         color: 'white',
    //         fontWeight: 'bold',
    //       }}
    //     />
    //   </Stack>
    //   <Stack
    //     flexDirection='row'
    //     gap={7}
    //     flex={1}
    //     alignItems='center'
    //   >
    //     <Card sx={{ p: 5, backgroundColor: '#f5f5f5' }}>
    //       <Typography sx={{ fontWeight: 'bold' }}>
    //         JobId: {jobDetail.data?.id}
    //       </Typography>

    //       <Typography sx={{ fontWeight: 'bold' }}>
    //         Status: {jobDetail.data?.state}
    //       </Typography>

    //       <Typography sx={{ fontWeight: 'bold' }}>
    //         Datum: {jobDetail.data?.timestamp}
    //       </Typography>

    //       <Typography sx={{ fontWeight: 'bold' }}>
    //         SAS: {jobDetail.data?.SAS}
    //       </Typography>
    //     </Card>

    //     <Card sx={{ p: 5, backgroundColor: '#f5f5f5' }}>
    //       <Typography sx={{ fontWeight: 'bold' }}>
    //         RunnerId: {runnerDetail.data?.id}
    //       </Typography>

    //       <Typography sx={{ fontWeight: 'bold' }}>
    //         Status: {runnerDetail.data?.state}
    //       </Typography>

    //       <Typography sx={{ fontWeight: 'bold' }}>
    //         Organizace: {runnerDetail.data?.organization}
    //       </Typography>

    //       <Typography sx={{ fontWeight: 'bold' }}>
    //         Runner skupina: {runnerDetail.data?.runner_group}
    //       </Typography>
    //     </Card>
    //   </Stack>
    //   <Card sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
    //     <Typography variant='h4' color='black'>
    //       Runner Output:
    //     </Typography>
    //     <Paper
    //       elevation={3}
    //       sx={{
    //         p: 2,
    //         backgroundColor: "#1e1e1e",
    //         color: "#d4d4d4",
    //         fontFamily: "monospace",
    //         overflowX: "auto",
    //         whiteSpace: "pre-wrap", // This ensures new lines are displayed.
    //         wordWrap: "break-word", // Ensures long text doesn't overflow.
    //         borderRadius: 2,
    //       }}>
    //       {runnerLog.log}
    //     </Paper>
    //   </Card>
    // </Stack>
  );
}


const getChipColor = (state: string): string => {
  switch (state) {
    case 'success':
      return '#4BA43A';
    case 'idle':
      return '#499AF2';
    case 'offline':
      return 'gray';
    case 'failed':
      return '#BE3B2B';
    default:
      return 'gray';
  }
};
