'use client';

import { useGetJobDetailQuery, useGetRunnerDetailQuery } from '@/services/runner';
import { RootState } from '@/store';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function JobDetail() {
  const { id } = useParams() as { id: string };
  const runnerLog = useSelector((state: RootState) => state.app.runnerLog.runnerLog);

  const jobDetail = useGetJobDetailQuery(id);

  const runnerDetail = useGetRunnerDetailQuery(jobDetail.data ? jobDetail.data.runner : "", {
    skip: !jobDetail.data
  });

  return (
    <Stack spacing={2} flex={1}>
      <Stack flexDirection='row' gap={3} flex={1} alignItems='center'>
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
          Job: {jobDetail.data?.id}
        </Typography>
        <Chip
          label={jobDetail.data?.state}
          sx={{
            fontSize: '1rem', // Larger text for the chip
            backgroundColor: jobDetail.data?.state ? getChipColor(jobDetail.data.state) : 'grey',
            color: 'white',
            fontWeight: 'bold',
          }}
        />
      </Stack>
      <Stack
        flexDirection='row'
        gap={7}
        flex={1}
        alignItems='center'
      >
        <Card sx={{ p: 5, backgroundColor: '#f5f5f5' }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            JobId: {jobDetail.data?.id}
          </Typography>

          <Typography sx={{ fontWeight: 'bold' }}>
            Status: {jobDetail.data?.state}
          </Typography>

          <Typography sx={{ fontWeight: 'bold' }}>
            Datum: {jobDetail.data?.timestamp}
          </Typography>

          <Typography sx={{ fontWeight: 'bold' }}>
            SAS: {jobDetail.data?.SAS}
          </Typography>
        </Card>

        <Card sx={{ p: 5, backgroundColor: '#f5f5f5' }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            RunnerId: {runnerDetail.data?.id}
          </Typography>

          <Typography sx={{ fontWeight: 'bold' }}>
            Status: {runnerDetail.data?.state}
          </Typography>

          <Typography sx={{ fontWeight: 'bold' }}>
            Organizace: {runnerDetail.data?.organization}
          </Typography>

          <Typography sx={{ fontWeight: 'bold' }}>
            Runner skupina: {runnerDetail.data?.runner_group}
          </Typography>
        </Card>
      </Stack>
      <Card sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant='h4' color='black'>
          Runner Output:
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            fontFamily: "monospace",
            overflowX: "auto",
            whiteSpace: "pre-wrap", // This ensures new lines are displayed.
            wordWrap: "break-word", // Ensures long text doesn't overflow.
            borderRadius: 2,
          }}>
          {runnerLog.log}
        </Paper>
      </Card>
    </Stack>
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
