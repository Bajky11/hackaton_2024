'use client';

import React, { useState } from 'react';
import { QueryOperator } from '@/services/settings';
import { useGetAutomationListQuery } from '@/services/automation';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { TableComboBox } from '@/components/buildingBlocks/dataGrid/components/TableComboBox';
import { StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
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

  const isMobile = useMediaQuery('(max-width:600px)');

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

  console.log('Automations List:', automationsList);

  const {
    data: sasList,
    isLoading: isSasListLoading,
    error: sasListError,
  } = useGetSASListQuery();

  console.log('SAS List:', sasList);

  const {
    data: typeList,
    isLoading: isTypeListLoading,
    error: typeListError,
  } = useGetAutomationTypeListQuery();

  console.log('Type List:', typeList);

  if (isAutomationsListLoading || isSasListLoading) return 'loading';
  if (automationsListError || sasListError) return 'error';

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
    router.push(`/app/automationsV2/${row.id}`);
  };

  return (
    <Stack spacing={2} padding={2}>
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
        rows={automationsList}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </Stack>
  );
};
export default AutomationsTable;
