import { useColorScheme } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react'

interface RunnerMemoryUsageBarChartProps {
    builds: number,
    tests: number,
    deploymentsNonProduction: number,
    deploymentsProduction: number,
}

const RunnerMemoryUsageBarChart = (
    { builds, tests, deploymentsNonProduction, deploymentsProduction }: RunnerMemoryUsageBarChartProps) => {

    const { colorScheme } = useColorScheme();

    return (
        <HighchartsReact
            containerProps={{ style: { width: '100%', height: '100%' } }}
            highcharts={Highcharts}
            options={{
                chart: {
                    type: 'column',
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
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: 'justify',
                        style: {
                            color: colorScheme === 'dark' ? '#fff' : '#000'
                        }
                    }
                },
                plotOptions: {
                    column: {
                        borderRadius: '5%',
                        dataLabels: {
                            enabled: true,
                            color: colorScheme === 'dark' ? '#fff' : '#000',
                            formatter: function () {
                                return `${this.y.toFixed(2)} TB`;
                            },
                        },
                        groupPadding: 0.1,
                    }
                },
                legend: {
                    enabled: false,
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
                        colorByPoint: true,
                        color: "#2C5DDA",
                        name: "Memory",
                        data: [
                            {
                                color: "#2C5DDA",
                                y: builds,
                            },
                            {
                                color: "#9E51AE",
                                y: tests,
                            },
                            {
                                color: "#898989",
                                y: deploymentsNonProduction,
                            },
                            {
                                color: "#4BA43A",
                                y: deploymentsProduction,
                            }
                        ]
                    }
                ]
            }}
        />
    )
}

export default RunnerMemoryUsageBarChart