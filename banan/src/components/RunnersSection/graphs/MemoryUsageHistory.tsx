import { Paper, Stack } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Metric } from '@/services/runner';

export function MemoryUsageHistory({ data }: { data: Metric[] }) {
  const memorySeries = data.map((item) => item.memory / (1024 * 1024)); // Paměť v MB

  return (
    <Stack component={Paper} p={1} maxHeight={300} flex={1}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'area',
          },
          title: {
            text: '',
          },
          xAxis: {
            labels: {
              enabled: false, // Skryje popisky na ose X
            },
            tickLength: 0, // Skryje značky na ose X
          },
          yAxis: {
            title: {
              text: 'Paměť (MB)',
            },
          },
          plotOptions: {
            area: {
              marker: {
                enabled: false, // Skryje značky bodů
              },
            },
          },
          series: [
            {
              name: 'Využití Paměti',
              data: memorySeries,
              color: '#9E51AE',
            },
          ],
        }}
      />
    </Stack>
  );
}
