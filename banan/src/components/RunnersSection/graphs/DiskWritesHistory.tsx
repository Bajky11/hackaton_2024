import { Paper, Stack } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

export function DiskWritesHistory({ data }) {
  const fsWritesSeries = data.map((item) => Number(item.fs_writes));

  return (
    <Stack component={Paper} p={1} flex={1} maxHeight={300}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'area',
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
