'use client';

import { Card, Stack, Typography, Skeleton } from '@mui/material';
import RunnersDataGrid from '@/components/dataGrids/RunnersDataGrid';
import { useEffect, useState } from 'react';
import { fetchCounts } from '@/functions/fetch/fetchCounts';
import { QueryOperator } from '@/services/settings';
import { LoadingTypography } from '@/components/LoadingTypography';

const states = [
  { label: 'Active', color: '#4BA43A', key: 'active' },
  { label: 'Idle', color: '#499AF2', key: 'idle' },
  { label: 'Offline', color: 'Gray', key: 'offline' },
  { label: 'Failed', color: '#BE3B2B', key: 'failed' },
];

export default function Page() {
  const [search, setSearch] = useState('');
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setCounts(await fetchStateCounts());
      } catch {
        setError('Failed to load state counts.');
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <Stack spacing={2} flex={1}>
      <Stack direction="row" gap={1}>
        {states.map(({ label, color, key }) => (
          <CountCard
            key={key}
            label={label}
            value={counts[key]}
            color={color}
            loading={loading}
            onClick={() => setSearch(key)}
          />
        ))}
      </Stack>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <RunnersDataGrid externalSearchParam={search} />
      )}
    </Stack>
  );
}

const fetchStateCounts = async () => {
  const states = ['active', 'idle', 'offline', 'failed'] as const;
  const counts: Record<(typeof states)[number], number | null> = {
    active: null,
    idle: null,
    offline: null,
    failed: null,
  };

  for (const state of states) {
    try {
      const { filteredCount } = await fetchCounts({
        base: 'runners',
        query: [
          { property: 'state', operator: QueryOperator.EQ, value: state },
        ],
      });
      counts[state] = filteredCount;
    } catch {
      counts[state] = null; // Při selhání se nastaví hodnota na `null`.
    }
  }

  return counts;
};

function CountCard({
  label,
  value,
  color,
  loading,
  onClick,
}: {
  label: string;
  value: number | null;
  color: string;
  loading: boolean;
  onClick?: any;
}) {
  const [hovered, setHovered] = useState(false);

  const textColor = hovered ? 'black' : color;
  const bgColor = hovered ? color : 'white';

  return (
    <Stack
      component={Card}
      alignItems="center"
      justifyContent="center"
      style={{
        padding: '8px',
        color: textColor,
        backgroundColor: bgColor,
        flex: 1,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Stack alignItems="center" justifyContent="center">
        <LoadingTypography
          loading={loading}
          text={label}
          variant="h6"
          fontWeight="bold"
        />
        <LoadingTypography
          loading={loading}
          text={value ?? 'N/A'}
          variant="h4"
          fontWeight="bold"
        />
      </Stack>
    </Stack>
  );
}
