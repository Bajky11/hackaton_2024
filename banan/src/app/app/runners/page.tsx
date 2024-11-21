'use client';

import { Stack } from '@mui/material';
import RunnersDataGrid from '@/components/dataGrids/RunnersDataGrid';
import { useEffect, useState } from 'react';
import { fetchCounts } from '@/functions/fetch/fetchCounts';
import { QueryOperator } from '@/services/settings';

export default function Page() {
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [filteredCount, setFilteredCount] = useState<number | null>(null);

  useEffect(() => {
    fetchCounts({
      base: 'runners',
      query: [
        { property: 'state', operator: QueryOperator.EQ, value: 'active' },
      ],
    }).then(({ totalCount, filteredCount }) => {
      setTotalCount(totalCount);
      setFilteredCount(filteredCount);
    });
  }, []);

  return (
    <Stack spacing={2} flex={1}>
      <p>Total Count: {totalCount}</p>
      <p>Filtered Count: {filteredCount}</p>
      <RunnersDataGrid />
    </Stack>
  );
}
