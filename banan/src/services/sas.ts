import { createApi } from '@reduxjs/toolkit/query/react';
import {
  UrlParams,
  customBaseQuery,
  urlParamsBuilder,
  keepUnusedDataFor,
} from './settings';

export const sasApi = createApi({
  reducerPath: 'sasApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getSASList: builder.query<string[], void | Partial<UrlParams>>({
      query: (params: UrlParams = {}) => {
        return urlParamsBuilder({ base: 'sas', ...params });
      },
      keepUnusedDataFor,
    }),
  }),
});

export const { useGetSASListQuery, usePrefetch } = sasApi;
