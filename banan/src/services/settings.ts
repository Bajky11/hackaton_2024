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

export const urlParamsBuilder = (base: string, page?: number, limit?: number): string => {
  let url = base;
  const params = new URLSearchParams();

  if (page !== undefined) params.append('page', page.toString());
  if (limit !== undefined) params.append('limit', limit.toString());

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return url;
}