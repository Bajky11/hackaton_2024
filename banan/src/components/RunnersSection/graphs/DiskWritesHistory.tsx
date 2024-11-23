import { Paper, Stack } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Metric } from '@/services/runner';

export function DiskWritesHistory({ data }: { data: Metric[] }) {
  const fsWritesSeries = data.map((item) => Number(item.fs_writes));

  return (
    <Stack
      p={1}
      flex={1}
      maxHeight={300}
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
              data: fsWritesSeries,
              color: '#4BA43A',
            },
          ],
        }}
      />
    </Stack>
  );
}
