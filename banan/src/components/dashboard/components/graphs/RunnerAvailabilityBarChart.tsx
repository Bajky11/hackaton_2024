import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Runner, RunnerState } from '@/services/runner';
import { useColorScheme } from '@mui/material';

const RunnerAvailabilityBarChart = ({ runners }: { runners: Runner[] }) => {

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


    const { colorScheme } = useColorScheme();

    // Rozdělení runnerů do skupin
    const groupedRunners = runners?.reduce(
        (groups, runner) => {
            if (builds.some(b => b.runner_group === runner.runner_group && b.organization === runner.organization)) {
                groups.builds.push(runner);
            } else if (tests.some(t => t.runner_group === runner.runner_group && t.organization === runner.organization)) {
                groups.tests.push(runner);
            } else if (deploymentsNonProduction.some(d => d.runner_group === runner.runner_group && d.organization === runner.organization)) {
                groups.deploymentsNonProduction.push(runner);
            } else if (deploymentsProduction.some(d => d.runner_group === runner.runner_group && d.organization === runner.organization)) {
                groups.deploymentsProduction.push(runner);
            }
            return groups;
        },
        {
            builds: [] as Runner[],
            tests: [] as Runner[],
            deploymentsNonProduction: [] as Runner[],
            deploymentsProduction: [] as Runner[],
        }
    );

    return (
        <HighchartsReact
            containerProps={{ style: { width: '100%', height: '100%' } }}
            highcharts={Highcharts}
            options={{
                chart: {
                    type: 'bar',
                    // height: '100%',
                    backgroundColor: null,
                },
                credits: {
                    enabled: false, // Zakáže zobrazení odkazu
                },
                title: {
                    text: null,
                },
                xAxis: {
                    categories: ["Builds", "Tests", "Deployments Non-Production", "Deployments Production"],
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return this.value.replace(" ", "<br>");
                        },
                        align: 'center',
                        style: {
                            color: colorScheme === 'dark' ? '#fff' : '#000'
                        }
                    },
                    gridLineWidth: 1,
                    lineWidth: 0
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Runners',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify',
                        style: {
                            color: colorScheme === 'dark' ? '#fff' : '#000'
                        }
                    },
                    gridLineWidth: 0
                },
                plotOptions: {
                    bar: {
                        borderRadius: '40%',
                        dataLabels: {
                            enabled: true,
                            color: colorScheme === 'dark' ? '#fff' : '#000',
                        },
                        groupPadding: 0.1,
                    }
                },
                legend: {
                    itemStyle: {
                        color: colorScheme === 'dark' ? '#fff' : '#000' // Barva textu v legendě
                    },
                    itemHoverStyle: {
                        color: colorScheme === 'dark' ? '#ddd' : '#333' // Barva textu při hoveru
                    },
                    itemHiddenStyle: {
                        color: colorScheme === 'dark' ? '#555' : '#aaa' // Barva textu skrytých položek
                    }
                },
                series: [
                    {
                        color: "#2C5DDA",
                        name: "Idle",
                        data: [
                            groupedRunners.builds.filter(runner => runner.state === RunnerState.IDLE).length,
                            groupedRunners.tests.filter(runner => runner.state === RunnerState.IDLE).length,
                            groupedRunners.deploymentsNonProduction.filter(runner => runner.state === RunnerState.IDLE).length,
                            groupedRunners.deploymentsProduction.filter(runner => runner.state === RunnerState.IDLE).length,
                        ]
                    }, {
                        color: "#9E51AE",
                        name: "Active",
                        data: [
                            groupedRunners.builds.filter(runner => runner.state === RunnerState.ACTIVE).length,
                            groupedRunners.tests.filter(runner => runner.state === RunnerState.ACTIVE).length,
                            groupedRunners.deploymentsNonProduction.filter(runner => runner.state === RunnerState.ACTIVE).length,
                            groupedRunners.deploymentsProduction.filter(runner => runner.state === RunnerState.ACTIVE).length,
                        ]
                    }, {
                        color: "#4BA43A",
                        name: "Offline",
                        data: [
                            groupedRunners.builds.filter(runner => runner.state === RunnerState.OFFLINE).length,
                            groupedRunners.tests.filter(runner => runner.state === RunnerState.OFFLINE).length,
                            groupedRunners.deploymentsNonProduction.filter(runner => runner.state === RunnerState.OFFLINE).length,
                            groupedRunners.deploymentsProduction.filter(runner => runner.state === RunnerState.OFFLINE).length,
                        ]
                    }, {
                        color: "#BE3B2B",
                        name: "Failed",
                        data: [
                            groupedRunners.builds.filter(runner => runner.state === RunnerState.FAILED).length,
                            groupedRunners.tests.filter(runner => runner.state === RunnerState.FAILED).length,
                            groupedRunners.deploymentsNonProduction.filter(runner => runner.state === RunnerState.FAILED).length,
                            groupedRunners.deploymentsProduction.filter(runner => runner.state === RunnerState.FAILED).length,
                        ]
                    }
                ]
            }}
        />
    )
}

export default RunnerAvailabilityBarChart