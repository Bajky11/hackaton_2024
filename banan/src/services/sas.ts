import { createApi } from '@reduxjs/toolkit/query/react';
import { UrlParams, customBaseQuery, urlParamsBuilder } from './settings';

export const sasApi = createApi({
  reducerPath: 'sasApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getSASList: builder.query<string[], void | Partial<UrlParams>>({
      query: (params: UrlParams = {}) => {
        return urlParamsBuilder({ base: 'sas', ...params });
      },
    }),
  }),
});

export const { useGetSASListQuery } = sasApi;
