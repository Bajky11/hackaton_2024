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

export function NetworkRecieveHistory({ data }: { data: Metric[] }) {
  const theme = useTheme();

  const networkReceiveSeries = data.map((item) => Number(item.network_receive));

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
    </CustomCard>
  );
}
