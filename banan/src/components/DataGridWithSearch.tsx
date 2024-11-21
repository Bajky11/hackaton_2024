import React, { useState, useEffect, useRef } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stack, TextField, Typography } from '@mui/material';
import useDebounce from '@/hooks/useDebounce';
import useResizeObserver from '@react-hook/resize-observer';

interface DataGridWithSearchProps {
  heading: string;
  fetchData: (search: string) => any[];
  columns: GridColDef[];
  onRowClick?: (row: any) => void;
  externalSearchParam?: string;
}

const DataGridWithSearch: React.FC<DataGridWithSearchProps> = ({
  heading = 'Heading',
  fetchData,
  columns,
  onRowClick,
  externalSearchParam,
}) => {
  const [searchParam, setSearchParam] = useState('');

  useEffect(() => {
    setSearchParam(
      externalSearchParam !== undefined ? externalSearchParam : '',
    );
  }, [externalSearchParam]);

  const debouncedSearchParam = useDebounce(searchParam, 100);
  const data = fetchData(debouncedSearchParam);

  const ref = useRef(null);
  const [width, setWidth] = React.useState(window.innerWidth);

  useResizeObserver(ref, (entry) => {
    setWidth(entry.contentRect.width);
  });

  return (
    <Stack flex={1} gap={1}>
      <Stack direction={'row'} gap={2} alignItems={'center'} flex={1}>
        <Typography fontSize={32} fontWeight={'bold'}>
          {heading}
        </Typography>
        <TextField
          sx={{ flexGrow: 1 }}
          size={'small'}
          label="Search everything in table..."
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
      </Stack>
      <DataGrid
        rows={data}
        columns={columns}
        onRowClick={onRowClick}
        sx={{
          '& .MuiDataGrid-root': {
            width, // Dynamicky nastavuje šířku tabulky
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize: 16,
          },
        }}
      />
    </Stack>
  );
};

export default DataGridWithSearch;
