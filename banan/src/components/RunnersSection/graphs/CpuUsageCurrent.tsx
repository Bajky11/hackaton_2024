import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Paper, Stack } from '@mui/material';

export function CpuUsageCurrent({ data }) {
  const maxCpu = 100;
  const lastCpuValue = data[data.length - 1].cpu * 100;
  const utilizedCpu = (lastCpuValue / maxCpu) * 100;
  const freeCpu = 100 - utilizedCpu;

  return (
    <Stack component={Paper} p={1} maxHeight={300} flex={1}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'pie',
          },
          title: {
            text: '',
          },
          plotOptions: {
            pie: {
              innerSize: '60%', // Donut efekt
              dataLabels: {
                enabled: true,
                distance: 30, // Vzdálenost popisků od grafu
                format: '{point.name}: {point.y:.1f}%',
                style: {
                  color: '#000000', // Barva textu popisků
                },
              },
            },
          },
          series: [
            {
              name: 'CPU Využití',
              data: [
                { name: 'Využito', y: utilizedCpu, color: '#BE3B2B' }, // Oranžová barva
                { name: 'Volné', y: freeCpu, color: 'lightgray' }, // Zelená barva
              ],
            },
          ],
          // Přidání textu doprostřed grafu
          subtitle: {
            text: `${utilizedCpu.toFixed(1)}%`,
            align: 'center',
            verticalAlign: 'middle',
            style: {
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'black',
            },
          },
        }}
      />
    </Stack>
  );
}
