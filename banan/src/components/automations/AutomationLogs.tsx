'use client';

import React from 'react';
import { Typography, Stack, Box, Chip } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import { useGetAutomationDetailLogsQuery } from '@/services/automation';
import { getStateColor } from '@/services/automation';

const AutomationLogs: React.FC<{ id: string }> = ({ id }) => {
  const { data: logs, isLoading } = useGetAutomationDetailLogsQuery(id);

  if (isLoading) {
    return <Typography>Načítání logů...</Typography>;
  }

  return (
    <Stack spacing={4} sx={{ px: 4 }}>
      {/* Nadpis a shrnutí */}

      <Chip
        label={`Celkový počet logů: ${logs?.length || 0}`}
        color="primary"
        sx={{ mt: 1 }}
      />

      {/* Časová osa */}
      <Timeline position="alternate">
        {logs?.map((log, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor: getStateColor(log.to_state),
                  width: 12,
                  height: 12,
                }}
              />
              {index < logs.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body2" color="textSecondary">
                {new Date(log.timestamp).toLocaleString()}
              </Typography>
              <Typography variant="body1">{log.description}</Typography>
              <Typography variant="caption" color="textSecondary">
                {log.level} | {log.from_state} ➔ {log.to_state}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Stack>
  );
};

export default AutomationLogs;
