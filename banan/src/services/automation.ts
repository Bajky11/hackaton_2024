import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from './settings';

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
    getAutomations: builder.query<Automation[], void>({
      query: () => 'automations',
    }),
    getAutomation: builder.query<Automation, string>({
      query: (id) => `automations/${id}`,
    }),
    getAutomationLogs: builder.query<AutomationLog[], string>({
      query: (id) => `automations/${id}/logs`,
    }),
    getAutomationTypes: builder.query<AutomationType[], void>({
      query: () => 'automation-types',
    }),
    getAutomationType: builder.query<AutomationType, string>({
      query: (type) => `automation-types/${type}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAutomationsQuery,
  useGetAutomationQuery,
  useGetAutomationLogsQuery,
  useGetAutomationTypesQuery,
  useGetAutomationTypeQuery,
} = automationApi;
