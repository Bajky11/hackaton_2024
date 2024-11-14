
import { createApi } from '@reduxjs/toolkit/query/react'

import { customBaseQuery } from './settings';

export type Runner = {
    id: string;
    state: string;
    runner_group: string;
    organization: string;
}

export type Job = {
    id: string;
    state: string;
    organization: string;
    SAS: string;
    runner: string;
    timestamp: string;
}

export type Metric = {
    cpu: number;
    memory: number;
    network_receive: number;
    network_transmit: number;
    fs_reads: number;
    fs_writes: number;
}

export const runnerApi = createApi({
    reducerPath: 'runnerApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getRunners: builder.query<Runner[], void>({
            query: () => `runners`,
        }),
        getRunner: builder.query<Runner, string>({
            query: (id) => `runners/${id}`,
        }),
        getJobs: builder.query<Job[], void>({
            query: () => `jobs`,
        }),
        getJob: builder.query<Job, string>({
            query: (id) => `jobs/${id}`,
        }),
        getMetrics: builder.query<Metric[], void>({
            query: () => `metrics`,
        }),
        getMetric: builder.query<Metric, string>({
            query: (id) => `metrics/${id}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetRunnersQuery,
    useGetRunnerQuery,
    useGetJobsQuery,
    useGetJobQuery,
    useGetMetricsQuery,
    useGetMetricQuery,
} = runnerApi