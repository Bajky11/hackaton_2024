import { createApi } from '@reduxjs/toolkit/query/react';

import { UrlParams, customBaseQuery, urlParamsBuilder } from './settings';
import { type } from 'os';

export type Automation = {
  id: string;
  type: string;
  state: string;
  last_activity: string;
};

export type AutomationLog = {
  automation_id: string;
  timestamp: string;
  level: string;
  type: string;
  from_state: string;
  to_state: string;
  description: string;
};

export type AutomationType = {
  type: string;
  states: string[];
  initial_state: string;
  end_state: string;
  transitions: Transition[];
};

export type Transition = {
  from_state: string;
  to_state: string;
  event: string;
  action: string;
};

export const automationApi = createApi({
  reducerPath: 'automationApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getAutomationList: builder.query<{ items: Automation[]; total: number }, Partial<UrlParams> | void>({
      query: (params: UrlParams = {}) => ({
        url: urlParamsBuilder({ base: 'automations', ...params }),
      }),
      transformResponse: (response: Automation[], meta) => {

        // Získání konkrétní hlavičky
        const total = meta?.response?.headers.get('x-total-count');
        return { items: response, total: Number(total) };
      },
    }),
    getAutomationDetail: builder.query<Automation, string>({
      query: (id) => `automations/${id}`,
    }),
    getAutomationDetailLogs: builder.query<AutomationLog[], string>({
      query: (id) => `automations/${id}/logs`,
    }),
    getAutomationTypeList: builder.query<AutomationType[], void | Partial<UrlParams>>({
      query: (params: UrlParams = {}) => {
        return urlParamsBuilder({ base: 'automation-types', ...params });
      },
    }),
    getAutomationTypeDetail: builder.query<AutomationType, string>({
      query: (type) => `automation-types/${type}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAutomationListQuery,
  useGetAutomationDetailQuery,
  useGetAutomationDetailLogsQuery,
  useGetAutomationTypeListQuery,
  useGetAutomationTypeDetailQuery,
} = automationApi;
