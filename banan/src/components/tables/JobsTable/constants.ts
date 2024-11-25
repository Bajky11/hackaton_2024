import { GridColDef } from '@mui/x-data-grid';
import { formatTimestamp } from '@/functions/date/formatTimestamp';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 1 },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    flex: 1,
    valueGetter: (value) => formatTimestamp(value),
  },
  { field: 'state', headerName: 'State', flex: 1 },
];
