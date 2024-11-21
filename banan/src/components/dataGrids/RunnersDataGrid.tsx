import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useGetRunnerListQuery } from '@/services/runner';
import DataGridWithSearch from '@/components/DataGridWithSearch';
import { Chip } from '@mui/material';

interface RunnersDataGridProps {
  navigate?: boolean;
  externalSearchParam?: string; // Přidán prop pro externí search param
}

const getChipColor = (state: string): string => {
  switch (state) {
    case 'active':
      return '#4BA43A';
    case 'idle':
      return '#499AF2';
    case 'offline':
      return 'gray';
    case 'failed':
      return '#BE3B2B';
    default:
      return 'gray';
  }
};

const RunnersDataGrid = ({
  navigate = true,
  externalSearchParam,
}: RunnersDataGridProps) => {
  const router = useRouter();

  const columns: GridColDef[] = [
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

  const fetchData = (search: string) => {
    const {
      data: runnerList = [],
      isLoading,
      error,
    } = useGetRunnerListQuery({ search, limit: 20 });

    if (isLoading) return [];
    if (error) return [];

    return runnerList;
  };

  const handleRowClick = (row: any) => {
    if (navigate) router.push(`/app/runners/${row.id}`);
  };

  return (
    <DataGridWithSearch
      heading={'Runners table'}
      fetchData={fetchData}
      columns={columns}
      onRowClick={handleRowClick}
      externalSearchParam={externalSearchParam}
    />
  );
};

export default RunnersDataGrid;
