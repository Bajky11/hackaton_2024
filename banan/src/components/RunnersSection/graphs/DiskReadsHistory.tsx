import { Stack } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Metric } from '@/services/runner';
import {
  getBackgroundColor,
  getBorderColor,
} from '@/components/RunnersSection/graphs/functions';
import { useTheme } from '@mui/material/styles';
import { CustomCard } from '@/app/app/automations/[id]/page';

export function DiskReadsHistory({ data }: { data: Metric[] }) {
  const theme = useTheme();

  const fsReadsSeries = data.map((item) => Number(item.fs_reads));

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
    </CustomCard>
  );
}
