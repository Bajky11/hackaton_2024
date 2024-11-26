import React, { useRef, useEffect, useState, useCallback } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import { DataGrid, DataGridProps, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useColorScheme, useTheme } from '@mui/material';
import { Order, QueryOperator } from '@/services/settings';

export interface QueryOptions {
  page?: number;
  limit?: number;
  query?: { property: string; operator: QueryOperator; value: string }[];
  sort?: string;
  order?: Order | undefined;
}

export function StyledResponsiveDataGrid({
  columns,
  rows,
  getQueryOptions,
  ...props
}: DataGridProps & {
  getQueryOptions?: (options: any) => void;
}) {
  const ref = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  const theme = useTheme();
  const { colorScheme } = useColorScheme();

  // Nastavení počáteční šířky na straně klienta
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth); // Inicializace pouze na klientské straně
    }
  }, []);

  // Použití resize observeru k dynamické změně šířky
  useResizeObserver(ref, (entry) => {
    setWidth(entry.contentRect.width);
  });

  // TODO - Řešení server-side načítání dat

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0, // DataGrid uses 0-based index for pages
      pageSize: 10, // Default page size
    });


  const [queryOptions, setQueryOptions] = React.useState<QueryOptions>({
    page: 1,
    limit: paginationModel.pageSize,
  });

  useEffect(() => {
    getQueryOptions && getQueryOptions(queryOptions);
  }, [queryOptions]);

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
        order: sort === "asc" ? Order.ASC : Order.DESC, // Default to ascending order if not specified
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

  // Handle pagination model change
  const onPaginationModelChange = useCallback(
    (newPaginationModel: GridPaginationModel) => {
      setPaginationModel(newPaginationModel);

      setQueryOptions((prev) => ({
        ...prev,
        page: newPaginationModel.page + 1,
        limit: newPaginationModel.pageSize,
      }));
    },
    [],
  );





  return (
    <DataGrid
      columns={columns}
      rows={rows}
      {...props}
      sx={{
        backgroundColor: colorScheme === "light" ? theme.palette.background.default : "#1e1e1e",
        '& .MuiDataGrid-root': {
          width, // Dynamicky nastavuje šířku tabulky
        },
        '& .MuiDataGrid-columnHeader': {
          fontSize: 16,
          backgroundColor: colorScheme === "light" ? theme.palette.background.default : "#1e1e1e",
        },
      }}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
        },
      }}
      onFilterModelChange={onFilterChange}
      onSortModelChange={onSortModelChange}
      filterMode="server"
      sortingMode="server"
      paginationMode="server"
      pagination
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
    />
  );
}
