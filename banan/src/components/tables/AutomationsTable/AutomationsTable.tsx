'use client';

import React, { useState } from 'react';
import { Order, QueryOperator } from '@/services/settings';
import { useGetAutomationListQuery } from '@/services/automation';
import { Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { TableComboBox } from '@/components/buildingBlocks/dataGrid/components/TableComboBox';
import { QueryOptions, StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { useRouter } from 'next/navigation';
import { columns } from '@/components/tables/AutomationsTable/constant';
import { useGetSASListQuery } from '@/services/sas';
import { useGetAutomationTypeListQuery } from '@/services/automation';

const AutomationsTable = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [typeComboBoxValue, setTypeComboBoxValue] = useState('');
  const [sasComboBoxValue, setSasComboBoxValue] = useState('');
  const [stateComboBoxValue, setStateComboBoxValue] = useState('');

  const [queryOptionsAutomations, setQueryOptionsAutomations] = React.useState<QueryOptions>({
    page: 1,
    limit: 20,
  });

  const isMobile = useMediaQuery('(max-width:600px)');

  const {
    data: automationsList,
    isLoading: isAutomationsListLoading,
    error: automationsListError,
    isFetching
  } = useGetAutomationListQuery({
    search: searchValue,
    limit: queryOptionsAutomations.limit,
    page: queryOptionsAutomations.page,
    sort: queryOptionsAutomations?.sort,
    order: queryOptionsAutomations?.order,
    query: [
      sasComboBoxValue
        ? {
          property: 'sas',
          operator: QueryOperator.EQ,
          value: sasComboBoxValue,
        }
        : undefined,
      stateComboBoxValue
        ? {
          property: 'state',
          operator: QueryOperator.EQ,
          value: stateComboBoxValue,
        }
        : undefined,
      typeComboBoxValue
        ? {
          property: 'type',
          operator: QueryOperator.EQ,
          value: typeComboBoxValue,
        }
        : undefined,
      ...(queryOptionsAutomations.query || []),
    ].filter(Boolean),
  });

  const {
    data: sasList,
    isLoading: isSasListLoading,
    error: sasListError,
  } = useGetSASListQuery();

  const {
    data: typeList,
    isLoading: isTypeListLoading,
    error: typeListError,
  } = useGetAutomationTypeListQuery();

  // if (isAutomationsListLoading || isSasListLoading) return 'loading';
  if (automationsListError || sasListError) return 'error';

  const handleRowClick = (row: any) => {
    router.push(`/app/automations/${row.id}`);
  };

  const LOADING = isAutomationsListLoading || isSasListLoading;

  return (
    <Stack spacing={2}>
      <Typography fontSize={30} fontWeight={'bold'}>
        {"Automations Table"}
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
        <TableComboBox
          value={typeComboBoxValue}
          setValue={setTypeComboBoxValue}
          options={typeList?.map((item) => item.type) || []}
          label={'Type'}
          flex={2}
        />
        <TableComboBox
          value={sasComboBoxValue}
          setValue={setSasComboBoxValue}
          options={sasList || []}
          loading={isSasListLoading}
          label={'SAS'}
        />
        <TableComboBox
          value={stateComboBoxValue}
          setValue={setStateComboBoxValue}
          options={[...new Set(typeList?.flatMap((item) => item.states) || [])]}
          label={'State'}
          flex={2}
        />
      </Stack>
      <StyledResponsiveDataGrid
        loading={isFetching}
        rowCount={automationsList?.total}
        getQueryOptions={(options) => setQueryOptionsAutomations(options)}
        rows={automationsList ? automationsList.items : []}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </Stack>
  );
};
export default AutomationsTable;
