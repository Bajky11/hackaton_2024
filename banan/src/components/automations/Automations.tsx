'use client';

import {
  useGetAutomationListQuery,
  useGetAutomationTypeListQuery,
} from '@/services/automation';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
  Chip,
  Pagination,
} from '@mui/material';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { useRouter } from 'next/navigation';
import { getStateColor } from '@/services/automation';

const Automations: React.FC = () => {
  const router = useRouter();
  const [filterType, setFilterType] = useState<string>('');
  const [filterState, setFilterState] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [automationTypes, setAutomationTypes] = useState<string[]>([]);
  const [automationStates, setAutomationStates] = useState<string[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]); // Původní data
  const [filteredData, setFilteredData] = useState<any[]>([]); // Filtrovaná data
  const [page, setPage] = useState<number>(1); // Aktuální stránka
  const [totalPages, setTotalPages] = useState<number>(1); // Celkový počet stránek

  // Limit položek na stránku
  const limit = 10;

  // Načti data z API s ohledem na stránkování
  const { data: automationList } = useGetAutomationListQuery({ page, limit });
  const { data: automationTypeData } = useGetAutomationTypeListQuery({
    limit: 100,
  });

  useEffect(() => {
    if (automationList) {
      console.log('automationList:', automationList);
      setOriginalData(automationList.items); // Ulož data (předpokládáme, že data jsou v `items`)
      setFilteredData(automationList.items); // Inicializuj filtrovaná data
      console.log(automationList.total);
      setTotalPages(Math.ceil(automationList.total / limit)); // Nastav celkový počet stránek
    }
  }, [automationList]);

  useEffect(() => {
    if (automationTypeData) {
      const types = Array.from(
        new Set(automationTypeData.map((type) => type.type)),
      );
      setAutomationTypes(types);

      const states = Array.from(
        new Set(automationTypeData.flatMap((type) => type.states)),
      );
      setAutomationStates(states);
    }
  }, [automationTypeData]);

  // Funkce pro filtrování a řazení dat
  useEffect(() => {
    let data = [...originalData];

    // Filtr podle vyhledávacího termínu
    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
      data = data.filter(
        (automation) =>
          automation.id.toLowerCase().includes(lowerCaseSearchTerm) ||
          automation.type.toLowerCase().includes(lowerCaseSearchTerm),
      );
    }

    // Filtr podle typu
    if (filterType) {
      data = data.filter((automation) => automation.type === filterType);
    }

    // Filtr podle stavu
    if (filterState) {
      data = data.filter((automation) => automation.state === filterState);
    }

    // Řazení dat
    data.sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.last_activity).getTime() -
          new Date(b.last_activity).getTime()
        : new Date(b.last_activity).getTime() -
          new Date(a.last_activity).getTime(),
    );

    setFilteredData(data); // Aktualizuj filtrovaná data
  }, [searchTerm, filterType, filterState, sortOrder, originalData]);

  // Funkce pro změnu stránky
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={1}>
        <Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="">Všechny typy</MenuItem>
          {automationTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="">Všechny stavy</MenuItem>
          {automationStates.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Vyhledávání"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />

        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          variant="outlined"
        >
          <MenuItem value="asc">Nejstarší</MenuItem>
          <MenuItem value="desc">Nejnovější</MenuItem>
        </Select>
      </Stack>

      {/* Filtrované a seřazené seznamy */}
      <Stack direction="column" gap={2}>
        {filteredData.map((automation, index) => (
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

      {/* Stránkování */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
        sx={{ alignSelf: 'center' }}
      />
    </Stack>
  );
};

export default Automations;
