import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useGetRunnerListQuery } from '@/services/runner';
import DataGridWithSearch from '@/components/DataGridWithSearch';

interface RunnersDataGridProps {
  navigate?: boolean;
}

const RunnersDataGrid = ({ navigate = true }: RunnersDataGridProps) => {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
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
      fetchData={fetchData}
      columns={columns}
      onRowClick={handleRowClick}
    />
  );
};

export default RunnersDataGrid;
