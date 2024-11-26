import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetJobListQuery } from '@/services/runner';
import { QueryFilter } from '@/services/settings';
import { QueryOptions, StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { columns } from './constants';

interface JobDataGridRowParams {
  query: QueryFilter[];
  navigate?: boolean;
}

const JobsDataGrid = ({ query, navigate }: JobDataGridRowParams) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const [queryOptionsJobs, setQueryOptionsJobs] = React.useState<QueryOptions>({
    page: 1,
    limit: 20,
  });

  const extendedQuery = {
    query: [...query].filter(Boolean),
  };

  const {
    data: jobsList,
    isLoading,
    error,
    isFetching
  } = useGetJobListQuery({
    page: queryOptionsJobs.page,
    sort: queryOptionsJobs?.sort,
    order: queryOptionsJobs?.order,
    limit: queryOptionsJobs.limit,
    query: [
      ...extendedQuery.query,
      ...(queryOptionsJobs.query || [])
    ],
    search: searchValue,
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
        loading={isFetching}
        rowCount={659}
        getQueryOptions={(options) => setQueryOptionsJobs(options)}
        rows={jobsList ? jobsList.items : []}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </Stack>
  );
};

export default JobsDataGrid;
