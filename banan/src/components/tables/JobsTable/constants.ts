import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 1 },
  { field: 'state', headerName: 'State', flex: 1 },
  { field: 'runner', headerName: 'Runner', flex: 1 },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    flex: 1,
    valueGetter: (value) => `${dayjs(value).format('YYYY-M-D HH:mm:ss')}`,
  },
];
