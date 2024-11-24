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
  FINISHED: '#4CAF50',
  RETRY_CHOICE: '#FF9800',
  FAILED: '#F44336',
  ERROR: '#F44336',
  DEFAULT: '#1976D2',
  WARNING: '#FF5F15',
};

// Funkce pro získání barvy podle stavu
export const getStateColor = (state: string): string => {
  return stateColors[state] || stateColors.DEFAULT;
};

export const automationApi = createApi({
  reducerPath: 'automationApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getAutomationList: builder.query<Automation[], void | Partial<UrlParams>>({
      query: (params: UrlParams = {}) => {
        return urlParamsBuilder({ base: 'automations', ...params });
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
    getFailedAutomationList: builder.query<
      { items: Automation[]; total: number },
      Partial<UrlParams> | void
    >({
      query: (params: UrlParams = {}) => ({
        url: urlParamsBuilder({
          base: 'automations',
          search: 'FAILED',
          ...params,
        }),
      }),
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
  useGetFailedAutomationListQuery,
} = automationApi;
