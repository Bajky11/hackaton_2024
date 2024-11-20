'use client';

import { Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { Runner, useGetRunnerListQuery } from '@/services/runner';

export default function Page() {
  const {
    data: runnerList,
    isLoading,
    error,
  } = useGetRunnerListQuery({ limit: 10 });

  if (isLoading) return <Typography>Načítání...</Typography>;
  if (error) return <Typography>Chyba při načítání dat</Typography>;

  return (
    <Stack spacing={2}>
      {runnerList.map((runner: Runner, id: number) => (
        <Paper
          key={id}
          elevation={3}
          component={Link}
          href={`/app/runners/${runner.id}`}
          sx={{ textDecoration: 'none' }}
        >
          <Stack p={2}>
            <Typography variant="h6" fontWeight="bold">
              {runner.id}
            </Typography>
            <Typography>description</Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
