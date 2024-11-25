'use client';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useColorScheme } from '@mui/material';

interface IRunnerSuccessPieChartProps {
  success: number;
  failed: number;
  color: string;
}

export const RunnerSuccessPieChart = ({ success, failed, color }: IRunnerSuccessPieChartProps) => {

  const { colorScheme } = useColorScheme();

  return (
    <HighchartsReact
      containerProps={{ style: { width: '90%', height: '100%' } }}
      highcharts={Highcharts}
      options={{
        chart: {
          type: 'pie',
          spacing: [0, 0, 0, 0],
          height: '100%',
          backgroundColor: null,
        },
        credits: {
          enabled: false, // Zakáže zobrazení odkazu
        },
        title: {
          text: null,
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: '70%', // Donut efekt
            dataLabels: {
              enabled: false, // Zakáže popisky
              connectorWidth: 0,
            },
          },
        },
        series: [{
          name: 'Jobs',
          colorByPoint: true,
          innerSize: '60%',
          startAngle: 0,
          data: [{
            name: 'Success',
            y: success,
            color: color,
          }, {
            name: 'Failed',
            y: failed,
            color: '#313030',
          }],
        }],
        // Přidání textu doprostřed grafu
        subtitle: {
          text: `${Number((success / (success + failed)) * 100).toFixed(1)}%`,
          align: 'center',
          verticalAlign: 'middle',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: colorScheme === 'dark' ? '#fff' : '#000',
          },
        },
      }}
    />
  );
}
