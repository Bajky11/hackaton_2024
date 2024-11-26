'use client';

import { Grid2, Typography, useTheme } from '@mui/material'
import React from 'react'
import RunnersSuccessWidget from './RunnersSuccessWidget'
import { useGetRunnerListQuery, useGetJobListQuery, Runner, Job, useGetMetricWithRunnerListQuery } from '@/services/runner';
import AutomationStatistics from '@/components/automations/AutomationStatistics';
import RunnersAvailabilityWidget from './RunnersAvailabilityWidget';
import RunnersMemoryUsageWidget from './RunnersMemoryUsageWidget';

const DashboardLayout = () => {

    const { data: runners, isFetching: runnersLoading } = useGetRunnerListQuery({ limit: -1 });
    const { data: jobs } = useGetJobListQuery({ limit: -1 });
    const { data: metricWithRunners } = useGetMetricWithRunnerListQuery({ limit: -1 });

    const getJobsByRunnerGroupAndOrganization = (organization: string, runnerGroup: string) => {
        if (!runners || !jobs) return [];

        const filteredRunners = runners.items.filter(
            (runner: Runner) =>
                runner.runner_group === runnerGroup && runner.organization === organization
        );

        if (filteredRunners.length === 0) return [];

        return jobs.items.filter((job: Job) =>
            filteredRunners.some((runner) => runner.id === job.runner)
        );
    }

    const builds = getJobsByRunnerGroupAndOrganization("csas-dev", "csas-linux");
    const tests = getJobsByRunnerGroupAndOrganization("csas-dev", "csas-linux-test");
    const deploymentsNonProduction = getJobsByRunnerGroupAndOrganization("csas-ops", "csas-linux");
    const deploymentsProduction = getJobsByRunnerGroupAndOrganization("csas-ops", "csas-linux-prod");

    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}  >
                <Typography fontSize={30} fontWeight={'bold'} pr={2}>
                    Runners Overview
                </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 3 }}  >
                <RunnersSuccessWidget
                    title="BUILDS"
                    color="#2C5DDA"
                    data={builds}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 3 }}  >
                <RunnersSuccessWidget
                    title="TESTS"
                    color="#9E51AE"
                    data={tests}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 3 }}  >
                <RunnersSuccessWidget
                    title="DEPLOYMENTS"
                    color="#898989"
                    data={deploymentsNonProduction}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 3 }}  >
                <RunnersSuccessWidget
                    title="DEPLOYMENTS"
                    color="#4BA43A"
                    data={deploymentsProduction}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}  >
                <RunnersAvailabilityWidget runners={runners ? runners.items : []} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 6 }}  >
                <RunnersMemoryUsageWidget
                    runners={runners ? runners.items : []}
                    metricWithRunners={metricWithRunners ?? []} />
            </Grid2>
        </Grid2>
    )
}

export default DashboardLayout