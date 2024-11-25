'use client';

import { Box, Typography } from '@mui/material';
import JobInSAS from '@/components/sas/JobInSAS';
import AutomationInSAS from '@/components/sas/AutomationInSAS';
import { useParams } from 'next/navigation';

export default function SasDetailPage(): JSX.Element {
  const { id } = useParams() as { id: string };

  return (
    <Box padding={2}>
      <Typography fontSize={30} fontWeight="bold" marginBottom={2}>
        Detail SAS: {id}
      </Typography>
      <Box
        display="flex"
        flexWrap={{
          xs: 'wrap',
          md: 'nowrap',
        }} /* Přizpůsobení na malých zařízeních */
        gap={2}
      >
        {/* Jobs sekce */}
        <Box
          flex={{
            xs: '1 1 100%',
            md: '2',
          }} /* Na mobilu 100% šířky, jinak 2/3 */
          flexBasis={{ xs: '100%', md: '66.66%' }}
        >
          <JobInSAS />
        </Box>
        {/* Automations sekce */}
        <Box
          flex={{
            xs: '1 1 100%',
            md: '1',
          }} /* Na mobilu 100% šířky, jinak 1/3 */
          flexBasis={{ xs: '100%', md: '33.33%' }}
        >
          <AutomationInSAS />
        </Box>
      </Box>
    </Box>
  );
}
