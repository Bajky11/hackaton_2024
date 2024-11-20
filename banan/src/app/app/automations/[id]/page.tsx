'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetAutomationDetailQuery } from '@/services/automation';
import {
  Typography,
  Card,
  Divider,
  CircularProgress,
  Chip,
  Grid,
  Box,
} from '@mui/material';
import AutomationLogs from '@/components/automations/AutomationLogs';
import StateDiagram from '@/components/automations/StateDiagram';
import { getStateColor } from '@/services/automation';

const AutomationDetail: React.FC = () => {
  const { id } = useParams();
  const { data: automationDetail, isLoading: isDetailLoading } =
    useGetAutomationDetailQuery(id);

  if (isDetailLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!automationDetail) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Automatizace nebyla nalezena
      </Typography>
    );
  }

  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
        Detaily Automatizace
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {/* Levý sloupec: Detaily */}
        <Grid item xs={10} sm={10} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Základní Informace
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <Typography variant="body1" gutterBottom>
                <strong>ID:</strong> {automationDetail.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Typ:</strong> {automationDetail.type}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Sas:</strong> {automationDetail.sas}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Aktuální Stav:</strong>
              </Typography>
              <Chip
                label={automationDetail.state}
                sx={{
                  backgroundColor: getStateColor(automationDetail.state),
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Střední sloupec: Logy */}
        <Grid item xs={10} sm={10} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Logy Automatizace
            </Typography>
            <AutomationLogs id={automationDetail.id} />
          </Card>
        </Grid>

        {/* Pravý sloupec: Stavový Diagram */}
        <Grid item xs={10} sm={10} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Stavový Diagram
            </Typography>
            <StateDiagram
              type={automationDetail.type}
              currentState={automationDetail.state}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AutomationDetail;
