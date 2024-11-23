'use client';

import { useParams } from 'next/navigation';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import {
  Automation,
  AutomationLog,
  useGetAutomationDetailQuery,
  useGetAutomationDetailLogsQuery,
  useGetAutomationTypeListQuery,
  useGetAutomationTypeDetailQuery,
} from '@/services/automation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

import * as React from 'react';
import CustomAccordion from '@/components/automationsV2/CustomAccordion';
import HorizontalTimeline from '@/components/automationsV2/HorizontalTimeline';

export default function AutomationDetail() {
  const { id } = useParams() as { id: string };

  const { data: automationData, isLoading: isAutomationDataLoading } =
    useGetAutomationDetailQuery(id);

  const { data: automationLogs, isLoading: isAutomationLogsLoading } =
    useGetAutomationDetailLogsQuery(id);

  if (
    isAutomationDataLoading ||
    isAutomationLogsLoading ||
    !automationData ||
    !automationLogs
  )
    return 'Loading...';

  return (
    <Stack spacing={1.5} flex={1}>
      <AutomationDetails automationData={automationData} />
      <AutomationScheme automationData={automationData} />
      <AutomationProcess automationLogs={automationLogs} />
    </Stack>
  );
}

const grayTypographyAttributes = {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#727272',
};

const headingTypographyAttributes = {
  fontSize: 18,
  fontWeight: 800,
  color: '#727272',
};

interface AutomationDetailsProps {
  automationData: Automation;
}

function AutomationDetails({ automationData }: AutomationDetailsProps) {
  return (
    <Stack spacing={1} flex={1}>
      <Typography {...headingTypographyAttributes}>
        Automation details
      </Typography>
      <CustomCard>
        <Stack p={1} gap={1}>
          <Typography fontWeight={'bold'} fontSize={18}>
            {automationData.type}
          </Typography>
          <Typography {...grayTypographyAttributes}>
            ID: {automationData.id}
          </Typography>
          <Typography {...grayTypographyAttributes}>
            STATE: {automationData.state}
          </Typography>
          <Typography {...grayTypographyAttributes}>
            SAS: {automationData.sas}
          </Typography>
        </Stack>
      </CustomCard>
    </Stack>
  );
}

interface AutomationSchemeProps {
  automationData: Automation;
}

function AutomationScheme({ automationData }: AutomationSchemeProps) {
  const { data: automationType, isLoading: isAutomationTypeLoading } =
    useGetAutomationTypeDetailQuery(automationData.type);

  if (isAutomationTypeLoading || !automationType) return 'Loading...';

  return (
    <Stack flex={1} spacing={1}>
      <Typography {...headingTypographyAttributes}>
        Automation scheme
      </Typography>
      <CustomCard>
        <HorizontalTimeline items={automationType.states} />
      </CustomCard>
    </Stack>
  );
}

interface AutomationProcessProps {
  automationLogs: AutomationLog[];
}

function AutomationProcess({ automationLogs }: AutomationProcessProps) {
  return (
    <Stack spacing={1} flex={1}>
      <Typography {...headingTypographyAttributes}>
        Automation details
      </Typography>
      <CustomAccordion data={automationLogs} />
    </Stack>
  );
}

export function CustomCard({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: '#F6F6F6',
        border: '0.5px solid #D7D7D7',
        borderRadius: '16px',
        overflow: 'auto',
        flexGrow: 1,
        maxWidth: '100%',
      }}
    >
      {children}
    </Box>
  );
}
