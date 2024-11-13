
import { createApi } from '@reduxjs/toolkit/query/react'

import { customBaseQuery } from './settings';

export type Automation = {
    id: string;
    type: string;
    state: string;
    last_activity: string;
}

export const automationApi = createApi({
    reducerPath: 'automationApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getAutomations: builder.query<Automation[], void>({
            query: () => `automations`,
        }),
        getAutomationById: builder.query<Automation, string>({
            query: (id) => `automations/${id}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAutomationsQuery,
    useGetAutomationByIdQuery
} = automationApi