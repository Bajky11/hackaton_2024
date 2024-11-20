'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetAutomationDetailQuery } from '@/services/automation';
import {
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Chip,
} from '@mui/material';
import AutomationLogs from '@/components/automations/AutomationLogs';
import StateDiagram from '@/components/automations/StateDiagram'; // Import StateDiagram
import { getStateColor } from '@/services/automation';

const AutomationDetail: React.FC = () => {
  const { id } = useParams();
  const { data: automationDetail, isLoading: isDetailLoading } =
    useGetAutomationDetailQuery(id);

  if (isDetailLoading) {
    return <CircularProgress />;
  }

  if (!automationDetail) {
    return <Typography variant="h6">Automatizace nebyla nalezena</Typography>;
  }

  return (
    <Stack direction="column" spacing={3}>
      {/* Zobrazení základních informací */}
      <Card>
        <CardContent>
          <Typography variant="h6">ID:</Typography>
          <Typography variant="body1" gutterBottom>
            {automationDetail.id}
          </Typography>

          <Divider />

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Typ:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {automationDetail.type}
          </Typography>

          <Divider />

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Sas:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {automationDetail.sas}
          </Typography>

          <Divider />

          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Aktuální Stav:
          </Typography>
          <Chip
            label={automationDetail.state}
            sx={{
              backgroundColor: getStateColor(automationDetail.state),
              color: '#fff',
            }}
          />
        </CardContent>
      </Card>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        alignItems="flex-start"
        justifyContent="space-around"
        sx={{ width: '100%' }}
      >
        {/* Logy Automatizace */}
        <AutomationLogs id={automationDetail.id} />

        {/* Stavový Diagram */}
        <StateDiagram
          type={automationDetail.type}
          currentState={automationDetail.state}
        />
      </Stack>
    </Stack>
  );
};

export default AutomationDetail;
