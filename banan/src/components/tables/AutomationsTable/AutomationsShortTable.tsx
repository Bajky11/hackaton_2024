import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAutomationListQuery } from '@/services/automation';
import { QueryFilter } from '@/services/settings';
import { StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { columnsShort } from '@/components/tables/AutomationsTable/constant';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { Stack, Typography, useMediaQuery } from '@mui/material';

interface AutomationDataGridRowParams {
  query: QueryFilter[];
  navigate?: boolean;
}

const AutomationShortDataGrid = ({
  query,
  navigate,
}: AutomationDataGridRowParams) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const extendedQuery = {
    query: [...query].filter(Boolean),
  };

  const {
    data: automationList = [],
    isLoading,
    error,
  } = useGetAutomationListQuery({
    query: extendedQuery.query,
    search: searchValue,
    limit: 30,
  });

  const handleRowClick = (row: any) => {
    if (navigate) router.push(`/app/automations/${row.id}`);
  };

  return (
    <Stack spacing={2} pt={2}>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        justifyContent={'flex-end'}
      >
        <Typography fontSize={30} fontWeight={'bold'} pr={2}>
          Automation Table
        </Typography>
        <TableSearchField
          value={searchValue}
          setValue={setSearchValue}
          flex={2}
        />
      </Stack>

      <StyledResponsiveDataGrid
        rows={automationList}
        columns={columnsShort}
        onRowClick={handleRowClick}
      />
    </Stack>
  );
};

export default AutomationShortDataGrid;
