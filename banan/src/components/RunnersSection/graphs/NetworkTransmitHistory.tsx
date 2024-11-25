import { Stack } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Metric } from '@/services/runner';
import {
  getBackgroundColor,
  getBorderColor,
  getTextColor,
} from '@/components/RunnersSection/graphs/functions';
import { useTheme } from '@mui/material/styles';
import { CustomCard } from '@/app/app/automations/[id]/page';

export function NetworkTransmitHistory({ data }: { data: Metric[] }) {
  const theme = useTheme();

  const networkTransmitSeries = data.map((item) =>
    Number(item.network_transmit),
  );

  return (
    <CustomCard>
      <Stack maxHeight={300}>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'area',
              backgroundColor: getBackgroundColor(theme),
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
    </CustomCard>
  );
}
