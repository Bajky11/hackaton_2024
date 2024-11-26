import { GridColDef } from '@mui/x-data-grid';
import { formatTimestamp } from '@/functions/date/formatTimestamp';
import { Chip } from '@mui/material';

export const stateColors: { [key: string]: string } = {
  success: '#4BA43A',
  failed: '#BE3B2B',
  queued: '#9E51AE',
  in_progress: '#2C5DDA',
};

// Funkce pro získání barvy podle stavu
export const getStateColor = (state: string): string => {
  return stateColors[state] || stateColors.DEFAULT;
};

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 1 },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    flex: 1,
    valueGetter: (value) => formatTimestamp(value),
  },
  {
    field: 'state',
    headerName: 'State',
    flex: 1,
    minWidth: 150,
    sortable: true,
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          backgroundColor: getStateColor(params.value),
          color: '#fff',
        }}
      />
    ),
  },
];
