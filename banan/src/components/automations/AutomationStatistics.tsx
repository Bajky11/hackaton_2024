'use client';

import React, { useEffect, useState } from 'react';
import {
  useGetAutomationListQuery,
  useGetAutomationTypeListQuery,
} from '@/services/automation';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AutomationStatistics: React.FC = () => {
  const { data: automationList, isLoading: loadingAutomations } =
    useGetAutomationListQuery({ limit: 100 });
  const { data: automationTypeData, isLoading: loadingTypes } =
    useGetAutomationTypeListQuery({ limit: 100 });

  const [stateCounts, setStateCounts] = useState<{ [key: string]: number }>({});
  const [typeCounts, setTypeCounts] = useState<{ [key: string]: number }>({});
  const [successRate, setSuccessRate] = useState<{
    success: number;
    failure: number;
  }>({ success: 0, failure: 0 });

  const theme = useTheme();

  useEffect(() => {
    if (automationList) {
      const stateCounter: { [key: string]: number } = {};
      const typeCounter: { [key: string]: number } = {};
      let successCount = 0;
      let failureCount = 0;

      automationList?.forEach((automation) => {
        // Počet podle stavu
        stateCounter[automation.state] =
          (stateCounter[automation.state] || 0) + 1;

        // Počet podle typu
        typeCounter[automation.type] = (typeCounter[automation.type] || 0) + 1;

        // Úspěšnost
        if (automation.state === 'FINISHED') {
          successCount++;
        } else if (automation.state === 'FAILED') {
          failureCount++;
        }
      });

      setStateCounts(stateCounter);
      setTypeCounts(typeCounter);
      setSuccessRate({ success: successCount, failure: failureCount });
    }
  }, [automationList]);

  if (loadingAutomations || loadingTypes) {
    return (
      <Stack
        sx={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  const charts = [
    {
      title: 'Automatizace podle stavu',
      options: {
        chart: { type: 'column', height: 200 },
        title: { text: null },
        xAxis: {
          categories: Object.keys(stateCounts),
          labels: { enabled: false },
        },
        yAxis: { title: { text: 'Počet' } },
        tooltip: {
          pointFormat: '<b>{point.category}</b>: {point.y} automatizací',
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: false, // Skryje popisy sloupců
            },
          },
        },
        series: [
          {
            name: 'Počet',
            data: Object.entries(stateCounts).map(([state, count]) => ({
              name: state,
              y: count,
              color:
                Highcharts.getOptions().colors![Math.floor(Math.random() * 10)],
            })),
          },
        ],
      },
    },
    {
      title: 'Automatizace podle typu',
      options: {
        chart: { type: 'column', height: 200 },
        title: { text: null },
        xAxis: {
          categories: Object.keys(typeCounts),
          labels: { enabled: false },
        },
        yAxis: { title: { text: 'Počet' } },
        tooltip: {
          pointFormat: '<b>{point.category}</b>: {point.y} automatizací',
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: false, // Skryje popisy sloupců
            },
          },
        },
        series: [
          {
            name: 'Počet',
            data: Object.entries(typeCounts).map(([type, count]) => ({
              name: type,
              y: count,
              color:
                Highcharts.getOptions().colors![Math.floor(Math.random() * 10)],
            })),
          },
        ],
      },
    },
    {
      title: 'Úspěšnost automatizací',
      options: {
        chart: { type: 'pie', height: 200 },
        title: { text: null },
        tooltip: {
          pointFormat: '<b>{point.name}</b>: {point.y} automatizací',
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false, // Skryje popisy výsečí
            },
          },
        },
        series: [
          {
            name: 'Počet',
            data: [
              { name: 'Úspěšné', y: successRate.success, color: '#4caf50' },
              { name: 'Neúspěšné', y: successRate.failure, color: '#f44336' },
            ],
          },
        ],
      },
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Nadpis nad všemi grafy */}
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 3, // Odsazení pod nadpisem
          }}
        >
          Statistika Automatizací
        </Typography>
      </Grid>

      {/* Mapování jednotlivých grafů */}
      {charts.map((chart, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          sx={{
            flexBasis: '33%',
            flexGrow: 1,
            maxWidth: { xs: '100%', sm: '50%', md: '33%' },
          }}
        >
          <Paper elevation={3} sx={{ p: 2, height: 250 }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: theme.palette.text.secondary,
                textTransform: 'uppercase',
                mb: 2,
                textAlign: 'center',
              }}
            >
              {chart.title}
            </Typography>
            <HighchartsReact
              highcharts={Highcharts}
              options={chart.options}
              containerProps={{
                style: {
                  height: '100%',
                  width: '100%',
                },
              }}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AutomationStatistics;
