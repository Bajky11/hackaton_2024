import { createApi } from '@reduxjs/toolkit/query/react';

import { UrlParams, customBaseQuery, urlParamsBuilder } from './settings';

export type Notification = {
  id: string; // Unikátní ID
  type: 'automation' | 'user-action' | 'system'; // Typ notifikace
  message: string; // Zpráva k zobrazení
  link: string; // Odkaz na detail
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
          id: item.id,
          type: item.type,
          message: item.message || `Automation id ${item.type} failed`,
          link: item.link || `/app/automations/${item.id}`,
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
