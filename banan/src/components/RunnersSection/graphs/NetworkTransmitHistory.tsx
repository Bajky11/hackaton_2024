import { Paper, Stack } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Metric } from '@/services/runner';

export function NetworkTransmitHistory({ data }: { data: Metric[] }) {
  const networkTransmitSeries = data.map((item) =>
    Number(item.network_transmit),
  );
  return (
    <Stack
      p={1}
      maxHeight={300}
      flex={1}
      gap={10}
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
            text: 'Síťový Přenos - Odesláno',
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
              name: 'Odesláno',
              data: networkTransmitSeries,
              color: '#499AF2',
            },
          ],
        }}
      />
    </Stack>
  );
}
