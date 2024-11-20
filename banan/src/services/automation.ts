import { createApi } from '@reduxjs/toolkit/query/react';

import { UrlParams, customBaseQuery, urlParamsBuilder } from './settings';

export type Automation = {
  id: string;
  type: string;
  state: string;
  last_activity: string;
  sas: string;
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

export const stateColors: { [key: string]: string } = {
  FINISHED: '#4CAF50', // Green
  RETRY_CHOICE: '#FF9800', // Orange
  FAILED: '#F44336', // Red
  DEFAULT: '#1976D2', // Blue for other states
};

// Funkce pro získání barvy podle stavu
export const getStateColor = (state: string): string => {
  return stateColors[state] || stateColors.DEFAULT;
};

export const automationApi = createApi({
  reducerPath: 'automationApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getAutomationList: builder.query<
      { items: Automation[]; total: number },
      Partial<UrlParams>
    >({
      query: (params: UrlParams = {}) => ({
        url: urlParamsBuilder({ base: 'automations', ...params }),
      }),
      transformResponse: (response: Automation[], meta) => {
        // Získání `X-Total-Count` z hlaviček
        const total = parseInt(
          meta?.response?.headers.get('X-Total-Count') || '0',
          10,
        );
        return { items: response, total };
      },
    }),
    getAutomationDetail: builder.query<Automation, string>({
      query: (id) => `automations/${id}`,
    }),
    getAutomationDetailLogs: builder.query<AutomationLog[], string>({
      query: (id) => `automations/${id}/logs`,
    }),
    getAutomationTypeList: builder.query<AutomationType[], Partial<UrlParams>>({
      query: (params: UrlParams = {}) => ({
        url: urlParamsBuilder({ base: 'automation-types', ...params }),
      }),
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
