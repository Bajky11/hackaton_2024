import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetJobListQuery } from '@/services/runner';
import { QueryFilter, QueryOperator } from '@/services/settings';
import { StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { columns } from '@/components/tables/JobsTable/constants';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { Stack, useMediaQuery } from '@mui/material';
import { TableComboBox } from '@/components/buildingBlocks/dataGrid/components/TableComboBox';
import { useGetSASListQuery } from '@/services/sas';

interface JobDataGridRowParams {
  query: QueryFilter[];
  navigate?: boolean;
}

const JobsDataGrid = ({ query, navigate }: JobDataGridRowParams) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [sasComboBoxValue, setSasComboBoxValue] = useState('');
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
      </Stack>

      <StyledResponsiveDataGrid rows={jobsList} columns={columns} />
    </Stack>
  );
};

export default JobsDataGrid;
