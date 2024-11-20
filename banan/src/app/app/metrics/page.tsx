'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Paper, Stack } from '@mui/material';

export default function Metrics() {
  const data = [
    {
      cpu: 0.1124,
      memory: 125050379,
      network_receive: 3217,
      network_transmit: 2695,
      fs_reads: 127,
      fs_writes: 1635,
    },
    {
      cpu: 0.165,
      memory: 203366882,
      network_receive: 4017,
      network_transmit: 3086,
      fs_reads: 1618,
      fs_writes: 1218,
    },
    {
      cpu: 0.2565,
      memory: 218169698,
      network_receive: 5701366,
      network_transmit: 2158,
      fs_reads: 692,
      fs_writes: 1876,
    },
    {
      cpu: 0.4127,
      memory: 518089205,
      network_receive: 6244185,
      network_transmit: 3803,
      fs_reads: 1224,
      fs_writes: 3951636,
    },
    {
      cpu: 0.4777,
      memory: 1031992654,
      network_receive: 6012697,
      network_transmit: 3850,
      fs_reads: 2564,
      fs_writes: 5839093,
    },
    {
      cpu: 0.8636,
      memory: 838860800,
      network_receive: 238177,
      network_transmit: 1236,
      fs_reads: 3614,
      fs_writes: 6741031,
    },
    {
      cpu: 0.9728,
      memory: 891980605,
      network_receive: 226003,
      network_transmit: 2370,
      fs_reads: 2308,
      fs_writes: 2783119,
    },
    {
      cpu: 0.6541,
      memory: 998971712,
      network_receive: 205489,
      network_transmit: 1495,
      fs_reads: 1547,
      fs_writes: 5107488,
    },
  ];

  // Vrchní hranice pro každou metriku
  const maxCpu = 100; // 100 % CPU
  const maxMemory = 1600000000; // 1.6 GB v bajtech
  const maxNetwork = 7000000; // 7 MB
  const maxFsReads = 5000; // Arbitrární vrchní hranice pro I/O čtení
  const maxFsWrites = 7000000; // Arbitrární vrchní hranice pro I/O zápisy

  // Extrakce dat pro jednotlivé série
  const cpuSeries = data.map((item) => item.cpu * 100); // CPU v procentech
  const memorySeries = data.map((item) => item.memory / (1024 * 1024)); // Paměť v MB
  const networkReceiveSeries = data.map((item) => item.network_receive);
  const networkTransmitSeries = data.map((item) => item.network_transmit);
  const fsReadsSeries = data.map((item) => item.fs_reads);
  const fsWritesSeries = data.map((item) => item.fs_writes);

  // Výpočty pro procentuální využití
  const networkReceiveUtilization = data.map(
    (item) => (item.network_receive / maxNetwork) * 100,
  );
  const networkTransmitUtilization = data.map(
    (item) => (item.network_transmit / maxNetwork) * 100,
  );
  const fsReadsUtilization = data.map(
    (item) => (item.fs_reads / maxFsReads) * 100,
  );
  const fsWritesUtilization = data.map(
    (item) => (item.fs_writes / maxFsWrites) * 100,
  );

  // Výpočty pro procentuální využití
  const cpuUtilization = data.map((item) => (item.cpu * 100) / maxCpu);
  const memoryUtilization = data.map((item) => (item.memory / maxMemory) * 100);
  const networkUtilization = data.map(
    (item) =>
      ((item.network_receive + item.network_transmit) / (2 * maxNetwork)) * 100,
  );
  const fsUtilization = data.map(
    (item) =>
      ((item.fs_reads / maxFsReads + item.fs_writes / maxFsWrites) / 2) * 100,
  );
  // Použití posledního záznamu z dat

  const lastCpuValue = data[data.length - 1].cpu * 100; // Převod na procenta
  const utilizedCpu = (lastCpuValue / maxCpu) * 100;
  const freeCpu = 100 - utilizedCpu;

  return (
    <Stack gap={1}>
      <Stack gap={2}>
        <Stack component={Paper} p={1} width={600} height={300}>
          Vyvoj vyuziti pameti
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'area',
              },
              title: {
                text: '',
              },
              xAxis: {
                labels: {
                  enabled: false, // Skryje popisky na ose X
                },
                tickLength: 0, // Skryje značky na ose X
              },
              yAxis: {
                title: {
                  text: 'Paměť (MB)',
                },
              },
              plotOptions: {
                area: {
                  marker: {
                    enabled: false, // Skryje značky bodů
                  },
                },
              },
              series: [
                {
                  name: 'Využití Paměti',
                  data: memorySeries,
                },
              ],
            }}
          />
        </Stack>

        <Stack component={Paper} p={1} width={600} height={300}>
          Vyuziti CPU
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'pie',
              },
              title: {
                text: '',
              },
              plotOptions: {
                pie: {
                  innerSize: '60%', // Donut efekt
                  dataLabels: {
                    enabled: true,
                    distance: 30, // Vzdálenost popisků od grafu
                    format: '{point.name}: {point.y:.1f}%',
                    style: {
                      color: '#000000', // Barva textu popisků
                    },
                  },
                },
              },
              series: [
                {
                  name: 'CPU Využití',
                  data: [
                    { name: 'Využito', y: utilizedCpu, color: 'red' }, // Oranžová barva
                    { name: 'Volné', y: freeCpu, color: 'lightgray' }, // Zelená barva
                  ],
                },
              ],
              // Přidání textu doprostřed grafu
              subtitle: {
                text: `${utilizedCpu.toFixed(1)}%`,
                align: 'center',
                verticalAlign: 'middle',
                style: {
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'black',
                },
              },
            }}
          />
        </Stack>

        {/* Graf pro využití CPU */}
        <Stack component={Paper} p={1} width={600} height={300}>
          vyvoj vyuziti cpu
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'area',
              },
              title: {
                text: '',
              },
              xAxis: {
                labels: {
                  enabled: false, // Odebere popisky na ose X
                },
                tickLength: 0, // Odebere značky (ticks) na ose X
              },
              yAxis: {
                max: 100, // Nastaví maximální hodnotu na ose Y na 100
                title: {
                  text: 'Využití (%)',
                },
              },
              series: [
                {
                  name: `CPU (${cpuSeries[cpuSeries.length - 1]}%)`,
                  data: cpuSeries,
                },
              ],
            }}
          />
        </Stack>

        {/* Graf pro využití Paměti */}
        <Stack component={Paper} p={1} width={600} height={300}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'area',
              },
              title: {
                text: 'Využití Paměti',
              },
              xAxis: {
                labels: {
                  enabled: false, // Odebere popisky na ose X
                },
                tickLength: 0, // Odebere značky (ticks) na ose X
              },
              yAxis: {
                max: 100, // Nastaví maximální hodnotu na ose Y na 100
                title: {
                  text: 'Využití (%)',
                },
              },
              series: [
                {
                  name: `Paměť (${memoryUtilization[memoryUtilization.length - 1]}%)`,
                  data: memoryUtilization,
                },
              ],
            }}
          />
        </Stack>

        {/* Graf pro síťový příjem */}
        <Stack component={Paper} p={1} width={600} height={300}>
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
                max: 100, // Nastaví maximální hodnotu na ose Y na 100
                title: {
                  text: 'Využití (%)',
                },
              },
              series: [
                {
                  name: `Přijato (${networkReceiveUtilization[networkReceiveUtilization.length - 1]}%)`,
                  data: networkReceiveUtilization,
                },
              ],
            }}
          />
        </Stack>

        {/* Graf pro síťový přenos - Odesláno */}
        <Stack component={Paper} p={1} width={600} height={300}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'area',
              },
              title: {
                text: '',
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
                  data: networkTransmitUtilization,
                },
              ],
            }}
          />
        </Stack>

        {/* Graf pro I/O operace - Čtení */}
        <Stack component={Paper} p={1} width={600} height={300}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'area',
              },
              title: {
                text: 'I/O Operace - Čtení',
              },
              xAxis: {
                labels: {
                  enabled: false, // Odebere popisky na ose X
                },
                tickLength: 0, // Odebere značky (ticks) na ose X
              },
              yAxis: {
                max: 100, // Nastaví maximální hodnotu na ose Y na 100
                title: {
                  text: 'Využití (%)',
                },
              },
              series: [
                {
                  name: `Čtení (${fsReadsUtilization[fsReadsUtilization.length - 1]}%)`,
                  data: fsReadsUtilization,
                },
              ],
            }}
          />
        </Stack>

        {/* Graf pro I/O operace - Zápisy */}
        <Stack component={Paper} p={1} width={600} height={300}>
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
                max: 100, // Nastaví maximální hodnotu na ose Y na 100
                title: {
                  text: 'Využití (%)',
                },
              },
              series: [
                {
                  name: `Zápisy (${fsWritesUtilization[fsWritesUtilization.length - 1]}%)`,
                  data: fsWritesUtilization,
                },
              ],
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
