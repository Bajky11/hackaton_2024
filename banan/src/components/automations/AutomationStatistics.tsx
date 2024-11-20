'use client';

import React, { useEffect, useState } from 'react';
import {
    useGetAutomationListQuery,
    useGetAutomationTypeListQuery,
    useGetAutomationDetailLogsQuery,
} from '@/services/automation';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Paper, Stack, Typography, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AutomationStatistics: React.FC = () => {
    const { data: automationList, isLoading: loadingAutomations } = useGetAutomationListQuery({ limit: 100 });
    const { data: automationTypeData, isLoading: loadingTypes } = useGetAutomationTypeListQuery({ limit: 100 });
    const [stateCounts, setStateCounts] = useState<{ [key: string]: number }>({});
    const [typeCounts, setTypeCounts] = useState<{ [key: string]: number }>({});
    const [activityDistribution, setActivityDistribution] = useState<{ [key: string]: number }>({});
    const [successRate, setSuccessRate] = useState<{ success: number; failure: number }>({ success: 0, failure: 0 });
    const [dailyAutomations, setDailyAutomations] = useState<{ [key: string]: number }>({});

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if (automationList) {
            // Počet automatizací v jednotlivých stavech
            var stateCounter: { [key: string]: number } = {};
            automationList.items.forEach((automation) => {
                stateCounter[automation.state] = (stateCounter[automation.state] || 0) + 1;
            });
            setStateCounts(stateCounter);

            // Počet automatizací podle typu
            const typeCounter: { [key: string]: number } = {};
            automationList.items.forEach((automation) => {
                typeCounter[automation.type] = (typeCounter[automation.type] || 0) + 1;
            });
            setTypeCounts(typeCounter);

            // Distribuce automatizací podle poslední aktivity
            const activityCounter: { [key: string]: number } = {};
            automationList.items.forEach((automation) => {
                const date = new Date(automation.last_activity).toLocaleDateString();
                activityCounter[date] = (activityCounter[date] || 0) + 1;
            });
            setActivityDistribution(activityCounter);

            // Úspěšnost automatizací (poměr úspěšných/neúspěšných)
            let successCount = 0;
            let failureCount = 0;
            automationList.items.forEach((automation) => {
                if (automation.state === 'FINISHED') {
                    successCount++;
                } else if (automation.state === 'FAILED') {
                    failureCount++;
                }
            });
            setSuccessRate({ success: successCount, failure: failureCount });

            // Distribuce automatizací podle dnů v týdnu
            const dailyCounter: { [key: string]: number } = {};
            automationList.items.forEach((automation) => {
                const day = new Date(automation.last_activity).toLocaleString('cs-CZ', { weekday: 'long' });
                dailyCounter[day] = (dailyCounter[day] || 0) + 1;
            });
            setDailyAutomations(dailyCounter);
        }

    }, [automationList, automationTypeData]);

    if (loadingAutomations || loadingTypes) return <div>Načítání...</div>;

    return (
        <Grid container spacing={2}>
            {/* Počet automatizací podle stavu */}
            <Grid item xs={12} md={6}>
                <Stack component={Paper} p={2} elevation={6} square={false} sx={{ backgroundColor: '#2C5DDA' }}>
                    <HighchartsReact
                        backgroundColor={'#2C5DDA'}
                        highcharts={Highcharts}
                        options={{
                            chart: { type: 'pie' },
                            title: { text: 'Automatizace podle stavu' },
                            series: [
                                {
                                    name: 'Počet',
                                    data: Object.entries(stateCounts).map(([state, count]) => ({
                                        name: state,
                                        y: count,
                                    })),
                                },
                            ],
                        }}
                    />
                </Stack>
            </Grid>

            {/* Počet automatizací podle typu */}
            <Grid item xs={12} md={6}>
                <Stack component={Paper} p={2}>
                    <Typography variant="h6">Počet Automatizací podle Typu</Typography>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: { type: 'column' },
                            title: { text: 'Automatizace podle typu' },
                            xAxis: { categories: Object.keys(typeCounts) },
                            yAxis: { title: { text: 'Počet' } },
                            series: [
                                {
                                    name: 'Počet',
                                    data: Object.values(typeCounts),
                                },
                            ],
                        }}
                    />
                </Stack>
            </Grid>

            {/* Distribuce automatizací podle poslední aktivity */}
            <Grid item xs={12} md={6}>
                <Stack component={Paper} p={2}>
                    <Typography variant="h6">Distribuce Automatizací Podle Poslední Aktivity</Typography>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: { type: 'line' },
                            title: { text: 'Automatizace podle poslední aktivity' },
                            xAxis: { categories: Object.keys(activityDistribution) },
                            yAxis: { title: { text: 'Počet' } },
                            series: [
                                {
                                    name: 'Počet',
                                    data: Object.values(activityDistribution),
                                },
                            ],
                        }}
                    />
                </Stack>
            </Grid>

            {/* Úspěšnost Automatizací */}
            <Grid item xs={12} md={6}>
                <Stack component={Paper} p={2}>
                    <Typography variant="h6">Úspěšnost Automatizací</Typography>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: { type: 'pie' },
                            title: { text: 'Úspěšnost automatizací' },
                            series: [
                                {
                                    name: 'Počet',
                                    data: [
                                        { name: 'Úspěšné', y: successRate.success },
                                        { name: 'Neúspěšné', y: successRate.failure },
                                    ],
                                },
                            ],
                        }}
                    />
                </Stack>
            </Grid>

            {/* Distribuce Automatizací podle Dnů v Týdnu */}
            <Grid item xs={12} md={6}>
                <Stack component={Paper} p={2}>
                    <Typography variant="h6">Distribuce Automatizací podle Dnů v Týdnu</Typography>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: { type: 'column' },
                            title: { text: 'Automatizace podle dnů v týdnu' },
                            xAxis: { categories: Object.keys(dailyAutomations) },
                            yAxis: { title: { text: 'Počet' } },
                            series: [
                                {
                                    name: 'Počet',
                                    data: Object.values(dailyAutomations),
                                },
                            ],
                        }}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default AutomationStatistics;

