'use client';

import { Paper, Stack, Typography } from '@mui/material';
import { useGetSASListQuery } from '@/services/sas';
import Link from 'next/link';

function SASList() {
  const { data: sasList, isLoading, error } = useGetSASListQuery();

  if (isLoading) return <Typography>Načítání...</Typography>;
  if (error) return <Typography>Chyba při načítání dat</Typography>;

  return (
    <Stack spacing={2} p={2}>
      {sasList.map((sas: string, id: number) => (
        <Paper
          key={id}
          elevation={3}
          component={Link}
          href={`/app/sas/${sas}`}
          sx={{ textDecoration: 'none' }}
        >
          <Stack p={2}>
            <Typography variant="h6" fontWeight="bold">
              {sas}
            </Typography>
            <Typography>description</Typography>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

export default SASList;
