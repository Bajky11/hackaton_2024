import React, { useEffect, useState } from 'react';
import { fetchStateCounts } from '@/components/RunnersSection/functions';
import { Stack } from '@mui/material';
import { states } from '@/components/RunnersSection/constants';
import CountCard from '@/components/RunnersSection/CountCard';

interface RunnerTableStateSearchProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function RunnerTableStateSearch({
  value,
  setValue,
}: RunnerTableStateSearchProps) {
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
    <Stack direction="row" gap={1.5}>
      {states.map(({ label, color, key }) => (
        <CountCard
          key={key}
          label={label}
          value={counts[key]}
          color={color}
          loading={loading}
          onClick={() => setValue(value === key ? '' : key)}
        />
      ))}
    </Stack>
  );
}
