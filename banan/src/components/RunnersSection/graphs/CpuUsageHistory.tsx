import { Paper, Stack } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Metric } from '@/services/runner';

export function CpuUsageHistory({ data }: { data: Metric[] }) {
  const cpuSeries = data.map((item) => item.cpu * 100);

  return (
    <Stack
      p={1}
      width={600}
      height={300}
      flex={2}
      bgcolor={'#F6F6F6'}
      border={'0.5px solid #D7D7D7'}
      borderRadius={1}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'area',
            backgroundColor: '#F6F6F6',
          },
          title: {
            text: '',
          },
          xAxis: {
            labels: {
              enabled: false, // Odebere popisky na ose X
            },
            tickLength: 0, // Odebere značky (ticks) na ose X
          },
          yAxis: {
            max: 100, // Nastaví maximální hodnotu na ose Y na 100
            title: {
              text: 'Využití (%)',
            },
          },
          series: [
            {
              name: `CPU (${cpuSeries[cpuSeries.length - 1]}%)`,
              data: cpuSeries,
              color: '#BE3B2B',
            },
          ],
        }}
      />
    </Stack>
  );
}
