import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stack, TextField } from '@mui/material';
import useDebounce from '@/hooks/useDebounce';

interface DataGridWithSearchProps {
  fetchData: (search: string) => any[];
  columns: GridColDef[];
  onRowClick?: (row: any) => void;
}

const DataGridWithSearch: React.FC<DataGridWithSearchProps> = ({
  fetchData,
  columns,
  onRowClick,
}) => {
  const [searchParam, setSearchParam] = useState('');
  const debouncedSearchParam = useDebounce(searchParam, 200);

  const data = fetchData(debouncedSearchParam);

  return (
    <Stack flex={1} gap={2}>
      <TextField
        label="Search..."
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <DataGrid rows={data} columns={columns} onRowClick={onRowClick} />
    </Stack>
  );
};

export default DataGridWithSearch;
