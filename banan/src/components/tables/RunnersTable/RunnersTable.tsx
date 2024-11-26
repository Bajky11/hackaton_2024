import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetRunnerListQuery } from '@/services/runner';
import { Stack, Typography } from '@mui/material';
import { QueryOperator } from '@/services/settings';
import {
  columns,
  organizationComboBoxOptions,
  runnerGroupComboBoxOptions,
} from '@/components/tables/RunnersTable/contants';
import { RunnerTableStateSearch } from '@/components/tables/RunnersTable/components/RunnersTableStateSearch';
import { TableComboBox } from '@/components/buildingBlocks/dataGrid/components/TableComboBox';
import { QueryOptions, StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import useMediaQuery from '@mui/material/useMediaQuery';

const RunnersTable = () => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [searchValue, setSearchValue] = useState('');
  const [runnerGroupComboBoxValue, setRunnerGroupComboBoxValue] = useState('');
  const [organizationComboBoxValue, setOrganizationComboBoxValue] =
    useState('');

  const [queryOptionsRunners, setQueryOptionsRunners] = React.useState<QueryOptions>({
    page: 1,
    limit: 20,
  });

  const {
    data: runnerList,
    isLoading,
    error,
    isFetching
  } = useGetRunnerListQuery({
    search: searchValue,
    limit: queryOptionsRunners.limit,
    page: queryOptionsRunners.page,
    sort: queryOptionsRunners?.sort,
    order: queryOptionsRunners?.order,
    query: [
      runnerGroupComboBoxValue
        ? {
          property: 'runner_group',
          operator: QueryOperator.EQ,
          value: runnerGroupComboBoxValue,
        }
        : undefined,
      organizationComboBoxValue
        ? {
          property: 'organization',
          operator: QueryOperator.EQ,
          value: organizationComboBoxValue,
        }
        : undefined,
      ...(queryOptionsRunners.query || []),
    ].filter(Boolean),
  });

  if (error) return 'error';

  const handleRowClick = (row: any) => {
    router.push(`/app/runners/${row.id}`);
  };

  function setQueryOptionsAutomations(options: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Stack spacing={2}>
      <Typography fontSize={30} fontWeight={'bold'} pr={2}>
        Runners Table
      </Typography>
      <RunnerTableStateSearch value={searchValue} setValue={setSearchValue} />
      <Stack
        sx={{
          pt: 4
        }}
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        justifyContent={'flex-end'}
      >
        <TableSearchField
          value={searchValue}
          setValue={setSearchValue}
          flex={2}
        />
        <TableComboBox
          value={runnerGroupComboBoxValue}
          setValue={setRunnerGroupComboBoxValue}
          options={runnerGroupComboBoxOptions}
          label={'Runner group'}
        />
        <TableComboBox
          value={organizationComboBoxValue}
          setValue={setOrganizationComboBoxValue}
          options={organizationComboBoxOptions}
          label={'Organization'}
        />
      </Stack>
      <StyledResponsiveDataGrid
        loading={isFetching}
        rows={runnerList?.items}
        getQueryOptions={(options) => setQueryOptionsRunners(options)}
        columns={columns}
        onRowClick={handleRowClick}
        rowCount={runnerList?.total}
      />
    </Stack>
  );
};

export default RunnersTable;
