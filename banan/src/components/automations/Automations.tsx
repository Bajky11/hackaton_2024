'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  Chip,
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
  Select,
  Pagination,
} from '@mui/material';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useGetAutomationTypeListQuery,
  useGetAutomationListQuery,
} from '@/services/automation';
import { useGetSASListQuery } from '@/services/sas';
import { getStateColor, Automation } from '@/services/automation';
import { Order } from '@/services/settings';

type Option = { label: string; group: string };

const formatLabel = (label: string) => label.replace(/_/g, ' ');

const Automations: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('none');
  const [sortOrder, setSortOrder] = useState<Order>(Order.ASC);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data: automationTypes } = useGetAutomationTypeListQuery({});
  const { data: sasList } = useGetSASListQuery();

  const { data: automationList } = useGetAutomationListQuery({
    search: searchTerm,
    page,
    limit,
    ...(sortBy !== 'none' && { sort: sortBy, order: sortOrder }),
  });

  // Načtení hodnot z URL při načtení stránky
  useEffect(() => {
    if (searchParams) {
      const initialSearch = searchParams.get('search') || '';
      const initialSortBy = searchParams.get('sortBy') || 'none';
      const initialSortOrder =
        (searchParams.get('sortOrder') as Order) || Order.ASC;
      const initialPage = parseInt(searchParams.get('page') || '1', 10);
      const initialLimit = parseInt(searchParams.get('limit') || '10', 10);

      setSearchTerm(initialSearch);
      console.log(searchTerm);
      setSortBy(initialSortBy);
      setSortOrder(initialSortOrder);
      setPage(initialPage);
      setLimit(initialLimit);
    }
  }, [searchParams]);

  // Synchronizace stavu s URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.set('search', searchTerm);
    if (sortBy !== 'none') params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (page !== 1) params.set('page', String(page));
    if (limit !== 10) params.set('limit', String(limit));

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchTerm, sortBy, sortOrder, page, limit]);

  const uniqueOptions = (options: Option[] | undefined | null): Option[] => {
    if (!options) return [];
    const uniqueSet = new Set<string>();
    return options.filter(({ label }) => {
      if (uniqueSet.has(label)) {
        return false;
      }
      uniqueSet.add(label);
      return true;
    });
  };

  const options: Option[] = useMemo(() => {
    const typesOptions =
      automationTypes?.map((type) => ({
        label: type.type,
        group: '----type----',
      })) || [];

    const sasOptions =
      sasList?.map((sas) => ({
        label: sas,
        group: '----sas----',
      })) || [];

    const stateOptions =
      automationTypes?.flatMap((type) =>
        type.states.map((state) => ({
          label: state,
          group: '----state----',
        })),
      ) || [];

    // Odstranění duplicit
    const uniqueTypesOptions = uniqueOptions(typesOptions);
    const uniqueSasOptions = uniqueOptions(sasOptions);
    const uniqueStateOptions = uniqueOptions(stateOptions);

    return [...uniqueTypesOptions, ...uniqueSasOptions, ...uniqueStateOptions];
  }, [automationTypes, sasList]);

  const sortFields = useMemo(() => {
    const fields: Array<keyof Automation> = [
      'id',
      'type',
      'state',
      'last_activity',
      'sas',
    ];
    return ['none', ...fields];
  }, []);

  const handleSearchChange = (event: any, value: string | null) => {
    setSearchTerm(value || '');
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleLimitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const handleSortChange = (field: string) => {
    setSortBy(field);
  };

  const handleSortOrderChange = (order: Order) => {
    setSortOrder(order);
  };

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2} alignItems="center">
        <Autocomplete
          freeSolo
          options={options}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => option.label}
          onInputChange={(event, value) => handleSearchChange(event, value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Vyhledávání"
              variant="outlined"
              size="small"
              value={searchTerm}
              sx={{ width: 400 }}
            />
          )}
          renderGroup={(params) => (
            <div key={`key_${params.key}`}>
              <Box
                sx={{
                  fontWeight: 'bold',
                  padding: '8px 16px',
                  backgroundColor: '#f0f0f0',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {params.group}
              </Box>
              {params.children}
            </div>
          )}
        />

        <Select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {sortFields.map((field) => (
            <MenuItem key={`sort_${field}`} value={field}>
              {field === 'none' ? 'No Sorting' : formatLabel(field)}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value as Order)}
          size="small"
          sx={{ minWidth: 100 }}
          disabled={sortBy === 'none'}
        >
          <MenuItem value={Order.ASC}>ASC</MenuItem>
          <MenuItem value={Order.DESC}>DESC</MenuItem>
        </Select>
      </Stack>

      <Stack direction="column" gap={2}>
        {automationList?.items.map((automation, index) => (
          <Card
            key={`${automation.id}-${index}`}
            variant="outlined"
            sx={{
              borderColor: getStateColor(automation.state),
              borderWidth: 2,
              borderStyle: 'solid',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '10px',
              }}
            >
              <Typography variant="h6">{automation.id}</Typography>
              <Chip
                label={automation.state}
                variant="filled"
                sx={{
                  backgroundColor: getStateColor(automation.state),
                  color: '#fff',
                }}
              />
              <Button
                size="small"
                onClick={() => router.push(`automations/${automation.id}`)}
              >
                <HelpOutlinedIcon />
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Pagination
          count={page + (automationList?.items.length < limit ? 0 : 1)}
          page={page}
          onChange={handlePageChange}
        />
        <Select
          value={limit}
          onChange={handleLimitChange}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value={5}>5 položek</MenuItem>
          <MenuItem value={10}>10 položek</MenuItem>
          <MenuItem value={20}>20 položek</MenuItem>
        </Select>
      </Stack>
    </Stack>
  );
};

export default Automations;
