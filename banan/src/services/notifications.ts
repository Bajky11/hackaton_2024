import { createApi } from '@reduxjs/toolkit/query/react';

import { UrlParams, customBaseQuery, urlParamsBuilder } from './settings';
import { v4 as uuidv4 } from 'uuid';

export type Notification = {
  unique_id: string;
  id: string; // Unikátní ID
  type: 'automation' | 'user-action' | 'system'; // Typ notifikace
  message: string; // Zpráva k zobrazení
  link: string; // Odkaz na detail
  dataId: string;
  state?: string;
};

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getFailedAutomationList: builder.query<
      { items: Notification[]; total: number },
      Partial<UrlParams> | void
    >({
      query: (params: UrlParams = {}) => ({
        url: urlParamsBuilder({
          base: 'automations',
          search: 'FAILED',
          ...params,
        }),
      }),
      transformResponse: (response: any[], meta) => {
        const notifications = response.map((item) => ({
          unique_id: uuidv4(),
          id: item.id,
          type: item.type,
          message: item.message || `Automation id ${item.id} failed`,
          dataId: item.id,
          link: item.link || `/app/automations/${item.id}`,
          state: "failed"
        }));

        const total =
          meta?.response?.headers.get('x-total-count') || notifications.length;

        return { items: notifications, total: Number(total) };
      },
    }),
  }),
});

// Export hooks pro použití v komponentách
export const { useGetFailedAutomationListQuery } = notificationsApi;
