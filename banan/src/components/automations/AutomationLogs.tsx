'use client';

import React, { useState } from 'react';
import {
  Typography,
  Stack,
  Card,
  CardContent,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import { useGetAutomationDetailLogsQuery } from '@/services/automation';
import { getStateColor } from '@/services/automation'; // Import funkce pro barvy

const AutomationLogs: React.FC<{ id: string }> = ({ id }) => {
  const { data: logs, isLoading } = useGetAutomationDetailLogsQuery(id);
  const [filterLevel, setFilterLevel] = useState<string>('');

  // Filtrace a hledání logů
  const filteredLogs = logs
    ? logs.filter((log) => {
        if (filterLevel && log.level !== filterLevel) {
          return false;
        }
        return true;
      })
    : [];

  if (isLoading) {
    return <Typography>Načítání logů...</Typography>;
  }

  return (
    <Stack
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
      direction="column"
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        Logy Automatizace
      </Typography>

      {/* Filtr a hledání */}
      <Stack
        direction="column"
        spacing={2}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '80%',
          alignSelf: 'start',
        }}
      >
        <Select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="">Všechny úrovně</MenuItem>
          <MenuItem value="INFO">INFO</MenuItem>
          <MenuItem value="WARNING">WARNING</MenuItem>{' '}
          {/* Přidána úroveň WARNING */}
          <MenuItem value="ERROR">ERROR</MenuItem>
        </Select>
      </Stack>

      {/* Grafické zobrazení v časové řadě */}
      <Timeline
        position="right"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {filteredLogs.map((log, index) => (
          <TimelineItem key={index} sx={{ '::before': { content: 'none' } }}>
            <TimelineSeparator>
              <TimelineDot
                style={{ backgroundColor: getStateColor(log.to_state) }}
              />
              {index < filteredLogs.length - 1 && <TimelineConnector />}
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
