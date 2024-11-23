import HighchartsReact from 'highcharts-react-official';
import Highcharts, { SeriesClickEventObject } from 'highcharts';
import { Paper, Stack } from '@mui/material';
import { Metric } from '@/services/runner';
import { CustomCard } from '@/app/app/automationsV2/[id]/page';
import { X } from '@mui/icons-material';

interface SuccessRateProps {
  data: SuccessRateCounts,
  title: string,
  onFailureClick: () => void,
  onSuccessClick: () => void
}

interface SuccessRateCounts {
  successCount: number
  failureCount: number
}

const failureName = 'Failure'
const successName = 'Successs'

export function SuccessRate({ data, title, onFailureClick, onSuccessClick }: SuccessRateProps) {
  const totalCount = data.successCount + data.failureCount;
  const failureRate = (data.failureCount / totalCount) * 100;
  const successRate = (data.successCount / totalCount) * 100;
  
  function handleClick(event: SeriesClickEventObject) {
    if (event.point.name == failureName) {
      onFailureClick();
      return;
    }

    onSuccessClick();
  }

  return (
    <Stack
      p={1}
      maxHeight={300}
      flex={1}
      bgcolor={'#F6F6F6'}
      border={'0.5px solid #D7D7D7'}
      borderRadius={1}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: 'pie',
            backgroundColor: '#F6F6F6',
          },
          title: {
            text: title,
          },
          plotOptions: {
            series: {
              point: {
                events: {
                  click: handleClick
                }
              }
            },
            pie: {
              innerSize: '60%', // Donut efekt
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                distance: 30, // Vzdálenost popisků od grafu
                format: '{point.name}: {point.rate:.2f}%',
                style: {
                  color: '#000000', // Barva textu popisků
                },
              },
            },
          },
          series: [
            {
              name: 'Počet jobů',
              data: [
                { name: failureName, y: data.failureCount, color: '#BE3B2B', rate: failureRate }, // Oranžová barva
                { name: successName, y: data.successCount, color: 'green', rate: successRate }, // Zelená barva
              ],
            },
          ],
          // Přidání textu doprostřed grafu
          subtitle: {
            text: `${failureRate.toFixed(2)}%`,
            align: 'center',
            verticalAlign: 'middle',
            y: 38,
            style: {
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'black',
            },
          },
        }}
      />
    </Stack>
  );
}
