import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetJobListQuery } from '@/services/runner';
import { QueryFilter } from '@/services/settings';
import { StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { columns } from '@/components/tables/JobsTable/constants';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { Stack, Typography, useMediaQuery } from '@mui/material';

interface JobDataGridRowParams {
  query: QueryFilter[];
  navigate?: boolean;
}

const JobsDataGrid = ({ query, navigate }: JobDataGridRowParams) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const extendedQuery = {
    query: [...query].filter(Boolean),
  };

  const {
    data: jobsList = [],
    isLoading,
    error,
  } = useGetJobListQuery({
    query: extendedQuery.query,
    search: searchValue,
    limit: 30,
  });

  const handleRowClick = (row: any) => {
    if (navigate) router.push(`/app/jobs/${row.id}`);
  };

  return (
    <Stack spacing={2} pt={2}>
      <Typography fontSize={30} fontWeight={'bold'} pr={2}>
        Jobs Table
      </Typography>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        justifyContent={'flex-end'}
      >
        <TableSearchField
          value={searchValue}
          setValue={setSearchValue}
          flex={2}
        />
      </Stack>

      <StyledResponsiveDataGrid
        rows={jobsList}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </Stack>
  );
};

export default JobsDataGrid;
