'use client';

import { useGetAutomationListQuery } from '@/services/automation';
import React, { useCallback, useEffect } from 'react';
import {
  Box,
  Chip,
} from '@mui/material';
import { QueryOperator } from '@/services/settings';
import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';

const Automations = () => {
  const [queryOptions, setQueryOptions] = React.useState({});
  const { data, error, isLoading } = useGetAutomationListQuery(queryOptions);

  // Mappings for DataGrid operators to QueryOperator
  const operatorMapping: { [key: string]: QueryOperator } = {
    contains: QueryOperator.LIKE,
    equals: QueryOperator.EQ,
    startsWith: QueryOperator.START,
    endsWith: QueryOperator.END,
    is: QueryOperator.EQ,
    isNot: QueryOperator.NE,
    greaterThan: QueryOperator.GT,
    greaterThanOrEqual: QueryOperator.GTE,
    lessThan: QueryOperator.LT,
    lessThanOrEqual: QueryOperator.LTE,
  };

  // Transform GridFilterModel into query parameters
  const transformFilters = (filterModel: GridFilterModel) => {
    const { items } = filterModel;
    return items
      .filter((filter) => filter.field && filter.operator && filter.value)
      .map((filter) => ({
        property: filter.field,
        operator: operatorMapping[filter.operator] ?? QueryOperator.EQ,
        value: filter.value,
      }));
  };

  // Handle filter changes
  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    const queryFilters = transformFilters(filterModel);
    setQueryOptions((prev) => ({
      ...prev,
      query: queryFilters,
    }));
  }, []);

  // Handle sorting changes
  const onSortModelChange = useCallback((sortModel: GridSortModel) => {
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      setQueryOptions((prev) => ({
        ...prev,
        sort: field,
        order: sort ?? 'asc', // Default to ascending order if not specified
      }));
    } else {
      // Clear sorting if no sort model is set
      setQueryOptions((prev) => ({
        ...prev,
        sort: undefined,
        order: undefined,
      }));
    }
  }, []);

  const dayjs = require('dayjs');


  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      width: 400,
      sortable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 300,
      sortable: true,
    },
    {
      field: 'state',
      headerName: 'State',
      width: 200,
      sortable: true,
      renderCell: (params) => (
        // TODO: color based on state
        <Chip label={params.value} color="success" />
      )
    },
    {
      field: 'last_activity',
      headerName: 'Last activity',
      width: 200,
      sortable: true,
      valueGetter: (value) => `${dayjs(value).format('YYYY-M-D HH:mm:ss')}`,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: '100%' }}>
      <DataGrid
        // ids duplicity... :/
        rows={data?.items.map((item, idx) => ({
          ...item,
          idx,
        })) || []}
        columns={columns}
        getRowId={(row) => row.idx}
        disableRowSelectionOnClick
        onFilterModelChange={onFilterChange}
        onSortModelChange={onSortModelChange}
        filterMode='server'
        sortingMode='server'
        loading={isLoading}
      />
    </Box>
  );
};

export default Automations;
