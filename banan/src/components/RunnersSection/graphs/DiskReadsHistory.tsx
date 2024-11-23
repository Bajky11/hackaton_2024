import { Stack } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Metric } from '@/services/runner';
import {
  getBackgroundColor,
  getBorderColor,
} from '@/components/RunnersSection/graphs/functions';
import { useTheme } from '@mui/material/styles';

export function DiskReadsHistory({ data }: { data: Metric[] }) {
  const theme = useTheme();

  const fsReadsSeries = data.map((item) => Number(item.fs_reads));

  return (
    <Stack
      p={1}
      flex={1}
      maxHeight={300}
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
            text: 'I/O Operace - Zápisy',
          },
          xAxis: {
            labels: {
              enabled: false, // Odebere popisky na ose X
            },
            tickLength: 0, // Odebere značky (ticks) na ose X
          },
          yAxis: {
            title: {
              text: 'Využití (%)',
            },
          },
          series: [
            {
              //name: `Zápisy (${fsWritesUtilization[fsWritesUtilization.length - 1]}%)`,
              data: fsReadsSeries,
              color: '#4BA43A',
            },
          ],
        }}
      />
    </Stack>
  );
}
