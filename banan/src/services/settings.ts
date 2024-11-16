import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const username = 'dopo';
const password = 'DevOps2024';
const encodedCredentials = btoa(`${username}:${password}`);

export const customBaseQuery = fetchBaseQuery({
  baseUrl: 'https://hackaton-api.fly.dev/api/v1/',
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Basic ${encodedCredentials}`);
    return headers;
  },
});

type QueryOperators = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'start' | 'end';

interface QueryFilter {
  property: string;
  operator: QueryOperators;
  value: string | number;
}

type Order = 'asc' | 'desc';

export type UrlParams = {
  base?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: Order;
  search?: string;
  query?: QueryFilter[];
};

export const defaultUrlParams: UrlParams = {
  page: 1,
  limit: -1,
};

export const urlParamsBuilder = ({
  base,
  page,
  limit,
  sort,
  order,
  search,
  query }: UrlParams
): string => {
  let url = base ?? "";
  const params = new URLSearchParams();

  if (page !== undefined) params.append('page', page.toString());
  if (limit !== undefined) params.append('limit', limit.toString());
  if (sort) params.append('sort', sort);
  if (order) params.append('order', order);
  if (search) params.append('search', search);

  if (query) {
    query.forEach(({ property, operator, value }) => {
      params.append(`${property}_${operator}`, value.toString());
    });
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return url;
};