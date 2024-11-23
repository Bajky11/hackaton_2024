import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import React from 'react';
import { getChipColor } from '@/components/tables/RunnersTable/functions';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'state',
    headerName: 'State',
    flex: 1,
    renderCell: (params) => {
      const chipColor = getChipColor(params.value);
      return (
        <Chip
          label={params.value}
          sx={{ backgroundColor: chipColor, color: 'white' }}
        />
      );
    },
  },
  { field: 'runner_group', headerName: 'Runner Group', flex: 1 },
  { field: 'organization', headerName: 'Organization', flex: 1 },
];

export const runnerGroupComboBoxOptions = [
  'csas-linux',
  'csas-linux-test',
  'csas-linux-prod',
];

export const organizationComboBoxOptions = ['csas-dev', 'csas-ops'];
