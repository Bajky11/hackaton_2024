'use client';

import { useGetAutomationListQuery } from '@/services/automation';
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/navigation';
import InfoIcon from '@mui/icons-material/Info';

const Automations = () => {
  const router = useRouter();
  const { data, error, isLoading } = useGetAutomationListQuery({ query: [{ property: "state", operator: "eq", value: "INITIAL" }] });

  function resolveColor(state: string) {
    switch (state) {
      case 'INITIAL':
        return 'white';
      case 'FINISHED':
        return '#4CAF50';
      case 'RETRY_CHOICE':
        return '#FF9800';
      case 'COMMAND_SENT':
      default:
        return '#1976D2';
    }
  }

  return (
    <Stack direction={'column'} gap={1}>
      {data &&
        data.map((automation, i) => (
          <Accordion key={i} sx={{ borderRadius: 1 }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              sx={{ backgroundColor: resolveColor(automation.state) }}
            >
              <Typography>{automation.type}</Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/automations/${automation.id}`);
                }}
              >
                <InfoIcon />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{automation.state}</Typography>
              <Typography>{automation.last_activity}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </Stack>
  );
};

export default Automations;
