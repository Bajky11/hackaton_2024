import { createApi } from '@reduxjs/toolkit/query/react';

import {
  UrlParams,
  customBaseQuery,
  urlParamsBuilder,
  keepUnusedDataFor,
} from './settings';
import { createSelector } from '@reduxjs/toolkit';

export type Runner = {
  id: string;
  state: RunnerState;
  runner_group: string;
  organization: string;
};

export enum RunnerState {
  IDLE = 'idle',
  ACTIVE = 'active',
  FAILED = 'failed',
  OFFLINE = 'offline',
}

export type Job = {
  id: string;
  state: JobState;
  organization: string;
  SAS: string;
  runner: string;
  timestamp: string;
};

export enum JobState {
  SUCCESS = 'success',
  FAILED = 'failed',
  QUEUED = 'queued',
  IN_PROGRESS = 'in_progress',
}

export type MetricWithRunner = {
  runner: string;
  metrics: Metric[];
};

export type Metric = {
  cpu: number;
  memory: number;
  network_receive: number;
  network_transmit: number;
  fs_reads: number;
  fs_writes: number;
};

export type SAS = string;

export const runnerApi = createApi({
  reducerPath: 'runnerApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getRunnerList: builder.query<{ items: Runner[]; total: number }, Partial<UrlParams> | void>({
      query: (params: UrlParams = {}) => ({
        url: urlParamsBuilder({ base: 'runners', ...params }),
      }),
      transformResponse: (response: Runner[], meta) => {
        // Získání konkrétní hlavičky
        const total = meta?.response?.headers.get('x-filtered-count');
        return { items: response, total: Number(total) };
      },
    }),
    getRunnerDetail: builder.query<Runner, string>({
      query: (id) => `runners/${id}`,
    }),
    getJobList: builder.query<{ items: Job[]; total: number }, Partial<UrlParams> | void>({
      query: (params: UrlParams = {}) => ({
        url: urlParamsBuilder({ base: 'jobs', ...params }),
      }),
      transformResponse: (response: Job[], meta) => {
        // Získání konkrétní hlavičky
        const total = meta?.response?.headers.get('x-filtered-count');
        return { items: response, total: Number(total) };
      },
    }),
    getJobDetail: builder.query<Job, string>({
      query: (id) => `jobs/${id}`,
    }),
    getMetricWithRunnerList: builder.query<
      MetricWithRunner[],
      void | Partial<UrlParams>
    >({
      query: (params: UrlParams = {}) => {
        return urlParamsBuilder({ base: 'metrics', ...params });
      },
    }),
    getMetricWithRunnerDetail: builder.query<MetricWithRunner, string>({
      query: (runnerId) => `metrics/${runnerId}`,
    }),
    getSasList: builder.query<SAS[], void>({
      query: () => 'sas',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetRunnerListQuery,
  useGetRunnerDetailQuery,
  useGetJobListQuery,
  useGetJobDetailQuery,
  useGetMetricWithRunnerListQuery,
  useGetMetricWithRunnerDetailQuery,
  usePrefetch,
} = runnerApi;

export const selectAllJobs = runnerApi.endpoints.getJobList.select();

export const selectSuccessfulJobs = createSelector(
  [selectAllJobs],
  (jobList) =>
    jobList?.data?.items.filter((job) => job.state === JobState.SUCCESS) || [],
);
