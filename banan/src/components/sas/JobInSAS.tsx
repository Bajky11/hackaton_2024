'use client';

import { SuccessRate } from '@/components/RunnersSection/graphs/SuccessRate';
import JobsDataGrid from '@/components/tables/JobsTable/JobsDataGrid';
import { useGetJobListQuery } from '@/services/runner';
import { QueryFilter, QueryOperator } from '@/services/settings';
import { Stack, Typography, Box, Button } from '@mui/material';
import { useParams } from 'next/navigation';
import { useState } from 'react';

enum StatisticEnum {
  BUILD = 'BUILD',
  TEST = 'TEST',
  DEPLOY = 'DEPLOY',
  DEPLOY_PROD = 'DEPLOY_PROD',
}

interface ShowStatisticContext {
  failureClicked: boolean;
  statisticName: StatisticEnum;
}

export default function JobInSAS(): JSX.Element {
  const [showStatisticContext, setShowStatisticContext] =
    useState<ShowStatisticContext | null>(null);
  const { id } = useParams() as { id: string };

  const afterGraphClickQueries: QueryFilter[] =
    showStatisticContext === null
      ? createBaseQuery(id)
      : createQueries(
          id,
          showStatisticContext.failureClicked,
          showStatisticContext.statisticName,
        );

  function getJobStatistic(failure: boolean, statistic: StatisticEnum): number {
    const {
      data: jobsList = [],
      isLoading,
      error,
    } = useGetJobListQuery({
      query: createQueries(id, failure, statistic),
    });

    if (isLoading) return NaN;
    if (error) return NaN;

    return jobsList.length;
  }

  return (
    <Box padding={2}>
      <Box
        gap={1}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          width: '350',
        }}
      >
        {Object.values(StatisticEnum).map((statistic: StatisticEnum) => {
          return (
            <Box width={370}>
              <SuccessRate
                key={statistic}
                title={getStaticTitle(statistic)}
                data={{
                  failureCount: getJobStatistic(true, statistic),
                  successCount: getJobStatistic(false, statistic),
                }}
                onFailureClick={() =>
                  setShowStatisticContext({
                    failureClicked: true,
                    statisticName: statistic,
                  })
                }
                onSuccessClick={() =>
                  setShowStatisticContext({
                    failureClicked: false,
                    statisticName: statistic,
                  })
                }
              />
            </Box>
          );
        })}
      </Box>

      {/* Tlačítko pro zrušení filtru */}
      {showStatisticContext && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowStatisticContext(null)}
          sx={{ marginBottom: 2 }}
        >
          Zrušit filtr
        </Button>
      )}

      <JobsDataGrid query={afterGraphClickQueries} navigate={true} />
    </Box>
  );
}

function createBaseQuery(id: string): QueryFilter[] {
  return [{ property: 'SAS', operator: QueryOperator.EQ, value: id }];
}

function createQueries(
  id: string,
  failure: boolean | undefined,
  statisticName?: StatisticEnum,
): QueryFilter[] {
  return [
    { property: 'SAS', operator: QueryOperator.EQ, value: id },
    {
      property: 'state',
      operator: QueryOperator.EQ,
      value: failure ? 'failed' : 'success',
    },
    {
      property: 'runner',
      operator: QueryOperator.LIKE,
      value: getRunnerByStatic(statisticName),
    },
  ];
}

function getRunnerByStatic(statisticName?: StatisticEnum): string {
  switch (statisticName) {
    case StatisticEnum.TEST:
      return 'csas-dev-csas-linux-test';
    case StatisticEnum.DEPLOY:
      return 'csas-ops-csas-linux';
    case StatisticEnum.DEPLOY_PROD:
      return 'csas-linux-prod';
    default:
      return 'csas-dev-csas-linux';
  }
}

function getStaticTitle(statisticName?: StatisticEnum): string {
  switch (statisticName) {
    case StatisticEnum.TEST:
      return 'Testy';
    case StatisticEnum.DEPLOY:
      return 'Deploy non-prod';
    case StatisticEnum.DEPLOY_PROD:
      return 'Deploy prod';
    default:
      return 'Buildy';
  }
}
