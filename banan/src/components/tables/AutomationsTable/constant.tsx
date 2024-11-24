import { GridColDef } from '@mui/x-data-grid';
import { getStateColor } from '@/services/automation';
import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    minWidth: 150,
    sortable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    minWidth: 150,
    sortable: true,
  },
  {
    field: 'sas',
    headerName: 'SAS',
    flex: 1,
    minWidth: 150,
    sortable: true,
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
  {
    field: 'last_activity',
    headerName: 'Last activity',
    width: 200,
    sortable: true,
    valueGetter: (value) => `${dayjs(value).format('YYYY-M-D HH:mm:ss')}`,
  },
];
