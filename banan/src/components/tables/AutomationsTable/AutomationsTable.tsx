'use client';

import React, { useState } from 'react';
import { QueryOperator } from '@/services/settings';
import { useGetAutomationListQuery } from '@/services/automation';
import { Stack, Typography } from '@mui/material';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { TableComboBox } from '@/components/buildingBlocks/dataGrid/components/TableComboBox';
import { StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { useRouter } from 'next/navigation';
import { columns } from '@/components/tables/AutomationsTable/constant';
import { useGetSASListQuery } from '@/services/sas';

const AutomationsTable = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [typeComboBoxValue, setTypeComboBoxValue] = useState('');
  const [sasComboBoxValue, setSasComboBoxValue] = useState('');
  const [stateComboBoxValue, setStateComboBoxValue] = useState('');

  const {
    data: automationsList = [],
    isLoading: isAutomationsListLoading,
    error: automationsListError,
  } = useGetAutomationListQuery({
    search: searchValue,
    limit: 20,
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
    ].filter(Boolean),
  });

  const {
    data: sasList,
    isLoading: isSasListLoading,
    error: sasListError,
  } = useGetSASListQuery();

  if (isAutomationsListLoading || isSasListLoading) return 'loading';
  if (automationsListError || sasListError) return 'error';

  const handleRowClick = (row: any) => {
    router.push(`/app/automationsV2/${row.id}`);
  };

  // TODO - Doplnit ComboBoxy typ, state
  // TODO - tabulka házi chyby protože ID jsou hodně stejná
  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
        <Typography fontSize={30} fontWeight={'bold'} pr={2}>
          Automations Table
        </Typography>
        <TableSearchField
          value={searchValue}
          setValue={setSearchValue}
          flex={2}
        />
        <TableComboBox
          value={typeComboBoxValue}
          setValue={setTypeComboBoxValue}
          options={['TODO']}
          label={'Type'}
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
          options={['TODO']}
          label={'State'}
        />
      </Stack>
      <StyledResponsiveDataGrid
        rows={automationsList.items}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </Stack>
  );
};
export default AutomationsTable;
