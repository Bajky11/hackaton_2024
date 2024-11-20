'use client';

import React, { useEffect, useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineItemClasses,
} from '@mui/lab'; // Správný import `timelineItemClasses`
import { Typography, Stack } from '@mui/material';
import {
  useGetAutomationTypeDetailQuery,
  getStateColor,
} from '@/services/automation';

const StateTimeline: React.FC<{ type: string; currentState: string }> = ({
  type,
  currentState,
}) => {
  const { data: automationTypeDetail, isLoading } =
    useGetAutomationTypeDetailQuery(type);
  const [timelineItems, setTimelineItems] = useState<any[]>([]);

  useEffect(() => {
    if (automationTypeDetail) {
      const items = automationTypeDetail.states.map((state) => ({
        state,
        timestamp: new Date().toLocaleString(), // Simulovaná časová data
      }));

      setTimelineItems(items);
    }
  }, [automationTypeDetail]);

  if (isLoading) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Načítání časové osy...
      </Typography>
    );
  }

  if (!automationTypeDetail) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Typ automatizace nebyl nalezen.
      </Typography>
    );
  }

  return (
    <Stack
      direction="column"
      sx={{ alignItems: 'flex-start', width: '100%', px: 2 }}
    >
      <Timeline position="left" sx={{ pl: 0 }}>
        {timelineItems.map((item, index) => (
          <TimelineItem key={index} sx={{ '::before': { content: 'none' } }}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  bgcolor:
                    item.state === currentState
                      ? getStateColor(currentState)
                      : 'transparent',
                  borderColor: getStateColor(item.state),
                  borderWidth: 2,
                  borderStyle: 'solid',
                  width: 16,
                  height: 16,
                }}
                variant={item.state === currentState ? 'filled' : 'outlined'}
              />
              {index < timelineItems.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: item.state === currentState ? 'bold' : 'normal',
                  color:
                    item.state === currentState
                      ? getStateColor(currentState)
                      : 'text.secondary',
                }}
              >
                {item.state}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Stack>
  );
};

export default StateTimeline;
