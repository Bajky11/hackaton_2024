import { UrlParams, urlParamsBuilder } from '@/services/settings';

export const fetchCounts = async (params: UrlParams) => {
  const url = `https://hackaton-api.fly.dev/api/v1/${urlParamsBuilder({ ...params, limit: 1 })}`;

  try {
    const response = await fetch('/api/count/getCounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const { totalCount, filteredCount } = await response.json();
    return { totalCount, filteredCount };
  } catch (error) {
    console.error('Error fetching counts:', error);
    return { totalCount: null, filteredCount: null };
  }
};
