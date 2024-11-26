import { Card, Box, Typography, useTheme, IconButton } from '@mui/material';
import React from 'react'
import { MetricWithRunner, Runner } from '@/services/runner';
import RunnerMemoryUsageBarChart from './graphs/RunnerMemoryUsageBarChart';
import MenuIcon from '@mui/icons-material/Menu';

const RunnersMemoryUsageWidget = ({ runners, metricWithRunners }: { runners: Runner[], metricWithRunners: MetricWithRunner[] }) => {

    const theme = useTheme();

    // Definování pravidel pro každou skupinu
    const builds = [
        { organization: "csas-dev", runner_group: "csas-linux" },
    ];
    const tests = [
        { organization: "csas-dev", runner_group: "csas-linux-test" },
    ];
    const deploymentsNonProduction = [
        { organization: "csas-ops", runner_group: "csas-linux" },
    ];
    const deploymentsProduction = [
        { organization: "csas-ops", runner_group: "csas-linux-prod" },
    ];

    const groupedMemoryUsage = () => {
        return metricWithRunners.reduce(
            (totals, metricWithRunner) => {
                const runner = runners.find((r) => r.id === metricWithRunner.runner);
                if (!runner) return totals; // Pokud runner neexistuje, přeskočíme

                const totalMemory = metricWithRunner.metrics.reduce(
                    (sum, metric) => sum + Number(metric.memory),
                    0
                );

                if (
                    builds.some(
                        (b) =>
                            b.runner_group === runner.runner_group &&
                            b.organization === runner.organization
                    )
                ) {
                    totals.builds += totalMemory;
                } else if (
                    tests.some(
                        (t) =>
                            t.runner_group === runner.runner_group &&
                            t.organization === runner.organization
                    )
                ) {
                    totals.tests += totalMemory;
                } else if (
                    deploymentsNonProduction.some(
                        (d) =>
                            d.runner_group === runner.runner_group &&
                            d.organization === runner.organization
                    )
                ) {
                    totals.deploymentsNonProduction += totalMemory;
                } else if (
                    deploymentsProduction.some(
                        (d) =>
                            d.runner_group === runner.runner_group &&
                            d.organization === runner.organization
                    )
                ) {
                    totals.deploymentsProduction += totalMemory;
                }

                return totals;
            },
            {
                builds: 0,
                tests: 0,
                deploymentsNonProduction: 0,
                deploymentsProduction: 0,
            }
        );
    };

    const memory = groupedMemoryUsage();
    return (
        <Card sx={{
            p: 3,
            pr: 2,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: "100%",
            border: `0.5px solid ${theme.palette.mode === 'light' ? '#D7D7D7' : '#333333'}`,
            borderRadius: 1,
            boxShadow: 0,
            height: 480
        }}>
            <Box sx={{ display: 'flex', width: "100%", pb: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: "bold", width: "100%" }}>{"Memory usage of runners"}</Typography>
                <IconButton>
                    <MenuIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                <RunnerMemoryUsageBarChart
                    builds={memory.builds / (10 ** 12)}
                    tests={memory.tests / (10 ** 12)}
                    deploymentsNonProduction={memory.deploymentsNonProduction / (10 ** 12)}
                    deploymentsProduction={memory.deploymentsProduction / (10 ** 12)}
                />
            </Box>
        </Card>
    )
}

export default RunnersMemoryUsageWidget