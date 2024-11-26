'use client';

import { SuccessRate } from '@/components/RunnersSection/graphs/SuccessRate';
import {
  AutomationType,
  useGetAutomationListQuery,
  useGetAutomationTypeListQuery,
} from '@/services/automation';
import { QueryFilter, QueryOperator } from '@/services/settings';
import { Stack, Typography, Box, Button } from '@mui/material';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import AutomationShortDataGrid from '@/components/tables/AutomationsTable/AutomationsShortTable';

interface ShowAutomationStatisticContext {
  failureClicked: boolean;
  statisticName: string;
}

export default function AutomationInSAS(): JSX.Element {
  const [showStatisticContext, setShowStatisticContext] =
    useState<ShowAutomationStatisticContext | null>(null);
  const { id } = useParams() as { id: string };

  const { data: automationList, isLoading } = useGetAutomationListQuery({
    query: createBaseQuery(id),
  });

  const { data: automationTypesList = [] } = useGetAutomationTypeListQuery({});

  if (isLoading) {
    return <Typography>Načítání...</Typography>;
  }

  const totalFail = automationList ? automationList.items.filter(
    (item) => item.state === 'FAILED',
  ).length : 0;

  const totalSuccess = automationList ? automationList.items.filter(
    (item) => item.state !== 'FAILED',
  ).length : 0;

  const afterGraphClickQueries: QueryFilter[] =
    showStatisticContext === null
      ? createBaseQuery(id)
      : createQueries(id, showStatisticContext.failureClicked);

  return (
    <Stack
      gap={2}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {/* Graf SuccessRate */}
      <Box width={370}>
        <SuccessRate
          title="Automatizace"
          data={{
            failureCount: totalFail,
            successCount: totalSuccess,
          }}
          onFailureClick={() =>
            setShowStatisticContext({
              failureClicked: true,
              statisticName: 'FAILED',
            })
          }
          onSuccessClick={() =>
            setShowStatisticContext({
              failureClicked: false,
              statisticName: 'SUCCESS',
            })
          }
        />
      </Box>

      {/* Tlačítko pro zrušení filtru */}
      {showStatisticContext && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setShowStatisticContext(null);
          }}
          sx={{ marginBottom: 2 }}
        >
          Zrušit filtr
        </Button>
      )}

      {/* Tabulka s filtrovanými daty */}
      <AutomationShortDataGrid query={afterGraphClickQueries} navigate={true} />
    </Stack>
  );
}

function createBaseQuery(id: string): QueryFilter[] {
  const query = [{ property: 'sas', operator: QueryOperator.EQ, value: id }];
  return query;
}

function createQueries(id: string, failure: boolean): QueryFilter[] {
  const query = [
    { property: 'sas', operator: QueryOperator.EQ, value: id },
    failure
      ? { property: 'state', operator: QueryOperator.EQ, value: 'FAILED' }
      : { property: 'state', operator: QueryOperator.NE, value: 'FAILED' },
  ];
  return query;
}
