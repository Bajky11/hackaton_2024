'use client';

import { Stack } from '@mui/material';
import RunnersTable from '@/components/tables/RunnersTable/RunnersTable';

export default function Page() {
  return (
    <Stack spacing={2} flex={1}>
      <RunnersTable />
    </Stack>
  );
}
