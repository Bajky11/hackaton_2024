import { createApi } from '@reduxjs/toolkit/query/react';

import { UrlParams, customBaseQuery, defaultUrlParams, urlParamsBuilder } from './settings';

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
    getAutomationList: builder.query<Automation[], void | Partial<UrlParams>>({
      query: (params: UrlParams = {}) => {
        const finalParams = { base: 'automations', ...defaultUrlParams, ...params };
        return urlParamsBuilder(finalParams);
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
        const finalParams = { base: 'automation-types', ...defaultUrlParams, ...params };
        return urlParamsBuilder(finalParams);
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
