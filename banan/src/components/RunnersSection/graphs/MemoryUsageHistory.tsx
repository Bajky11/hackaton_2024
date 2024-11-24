import { Stack } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Metric } from '@/services/runner';
import {
  getBackgroundColor,
  getBorderColor,
  getTextColor,
} from '@/components/RunnersSection/graphs/functions';
import { useTheme } from '@mui/material/styles';

export function MemoryUsageHistory({ data }: { data: Metric[] }) {
  const theme = useTheme();

  const memorySeries = data.map((item) => item.memory / (1024 * 1024)); // Paměť v MB

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
            type: 'area',
            backgroundColor: getBackgroundColor(theme),
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
