import { Paper, Stack } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Metric } from '@/services/runner';

export function NetworkRecieveHistory({ data }: { data: Metric[] }) {
  const networkReceiveSeries = data.map((item) => Number(item.network_receive));
  console.log(networkReceiveSeries);

  return (
    <Stack component={Paper} p={1} maxHeight={300} flex={1} gap={10}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'area',
          },
          title: {
            text: 'Síťový Přenos - Přijato',
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
              name: 'Přijato',
              data: networkReceiveSeries,
              color: '#499AF2',
            },
          ],
        }}
      />
    </Stack>
  );
}
