'use client';

import { Stack, TextField, Typography } from '@mui/material';
import { useGetRunnerListQuery } from '@/services/runner';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

export default function Page() {
  return (
    <Stack spacing={2}>
      <RunnersDataGrid />
    </Stack>
  );
}

// Obecná komponenta DataGrid s vyhledáváním
interface DataGridWithSearchProps {
  data: any[];
  columns: GridColDef[];
  searchParam: string;
  setSearchParam: (value: string) => void;
  onRowClick?: (row: any) => void;
}

const DataGridWithSearch: React.FC<DataGridWithSearchProps> = ({
  data,
  columns,
  searchParam,
  setSearchParam,
  onRowClick,
}) => {
  return (
    <Stack flex={1} gap={2}>
      <TextField
        label="Search..."
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={onRowClick}
      />
    </Stack>
  );
};

const RunnersDataGrid: React.FC = () => {
  const [searchParam, setSearchParam] = useState('');
  const debouncedSearchParam = useDebounce(searchParam, 200); // Použití debouncingu s 500ms zpožděním
  const router = useRouter();

  const {
    data: runnerList = [],
    isLoading,
    error,
  } = useGetRunnerListQuery({ search: debouncedSearchParam });

  if (isLoading) return <Typography>Načítání...</Typography>;
  if (error) return <Typography>Chyba při načítání dat</Typography>;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'runner_group', headerName: 'Runner Group', flex: 1 },
    { field: 'organization', headerName: 'Organization', flex: 1 },
  ];

  return (
    <Stack flex={1} gap={2}>
      <TextField
        label="Search..."
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <DataGrid
        rows={runnerList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={(row) => router.push(`/app/runners/${row.id}`)}
        autoHeight
      />
    </Stack>
  );
};
