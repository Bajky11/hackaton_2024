import { fetchCounts } from '@/functions/fetch/fetchCounts';
import { QueryOperator } from '@/services/settings';

export const fetchStateCounts = async () => {
  const states: string[] = ['active', 'idle', 'offline', 'failed'];
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
      counts[state] = null; // Při selhání se nastaví hodnota na null.
    }
  }

  return counts;
};
