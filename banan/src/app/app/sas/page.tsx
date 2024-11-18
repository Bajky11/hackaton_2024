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
        <Link key={sas} href={`/app/sas/${sas}`} passHref>
          <Paper key={id} elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {sas}
            </Typography>
            <Typography>description</Typography>
          </Paper>
        </Link>
      ))}
    </Stack>
  );
}

export default SASList;
