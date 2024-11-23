'use client';

import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { useRouter } from 'next/navigation';
import { columns } from '@/components/tables/AutomationsTable/constant';
import { useGetSASListQuery } from '@/services/sas';

const SasTable = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const {
    data: sasList = [],
    isLoading: isSasListLoading,
    error: sasListError,
  } = useGetSASListQuery({
    search: searchValue,
    limit: 20,
  });

  if (isSasListLoading) return 'loading';
  if (sasListError || sasListError) return 'error';

  const handleRowClick = (row: any) => {
    router.push(`/app/sas/${row.row.name}`);
  };

  return (
    <Stack spacing={2}>
      <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
        <Typography fontSize={30} fontWeight={'bold'} pr={2}>
          Sas Table
        </Typography>
        <TableSearchField
          value={searchValue}
          setValue={setSearchValue}
          flex={2}
        />
      </Stack>
      <StyledResponsiveDataGrid
        rows={sasList.map((sas, id) => ({ id, name: sas }))}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </Stack>
  );
};
export default SasTable;
