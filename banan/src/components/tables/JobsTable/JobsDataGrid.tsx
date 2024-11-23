import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import DataGridWithSearch from '@/components/DataGridWithSearch';
import { useGetJobListQuery } from '@/services/runner';
import { QueryFilter } from '@/services/settings';
import { format } from 'date-fns';
import { formatTimestamp } from '@/functions/date/formatTimestamp';

interface JobDataGridRowParams {
  query: QueryFilter[];
  navigate?: boolean;
}

const JobsDataGrid = ({ query, navigate }: JobDataGridRowParams) => {
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'organization', headerName: 'Organization', flex: 1 },
    { field: 'SAS', headerName: 'Sas', flex: 1 },
    //{ field: 'runner', headerName: 'Runner', flex: 1 },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      flex: 1,
      renderCell: (params) => <span>{formatTimestamp(params.value)}</span>,
    },
  ];

  const fetchData = (search: string) => {
    const {
      data: jobsList = [],
      isLoading,
      error,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useGetJobListQuery({
      query,
      search,
      limit: 30,
    });

    if (isLoading) return [];
    if (error) return [];

    return jobsList;
  };

  const handleRowClick = (row: any) => {
    if (navigate) router.push(`/app/jobs/${row.id}`);
  };

  return (
    <DataGridWithSearch
      heading={'Running Jobs'}
      fetchData={fetchData}
      columns={columns}
      onRowClick={handleRowClick}
    />
  );
};

export default JobsDataGrid;
