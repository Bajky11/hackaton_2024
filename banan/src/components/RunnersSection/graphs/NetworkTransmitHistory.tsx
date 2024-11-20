import { Paper, Stack } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function NetworkTransmitHistory({ data }) {
  const networkTransmitSeries = data.map((item) =>
    Number(item.network_transmit),
  );
  return (
    <Stack component={Paper} p={1} maxHeight={300} flex={1} gap={10}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'area',
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
