import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Stack } from '@mui/material';
import { Metric } from '@/services/runner';
import { useTheme } from '@mui/material/styles';
import {
  getBackgroundColor,
  getBorderColor,
  getTextColor,
} from '@/components/RunnersSection/graphs/functions';

export function CpuUsageCurrent({ data }: { data: Metric[] }) {
  const theme = useTheme();

  const maxCpu = 100;
  const lastCpuValue = data[data.length - 1].cpu * 100;
  const utilizedCpu = (lastCpuValue / maxCpu) * 100;
  const freeCpu = 100 - utilizedCpu;

  return (
    <Stack
      p={1}
      maxHeight={300}
      flex={1}
      bgcolor={getBackgroundColor(theme)}
      border={getBorderColor(theme)}
      borderRadius={1}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'pie',
            backgroundColor: getBackgroundColor(theme),
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
              color: getTextColor(theme),
            },
          },
        }}
      />
    </Stack>
  );
}
