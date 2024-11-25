'use client';

import { Grid2 } from '@mui/material'
import React from 'react'
import RunnersSuccessWidget from './RunnersSuccessWidget'
import { Job, Runner, useGetJobListQuery, useGetRunnerListQuery } from '@/services/runner';

const Dashboard = () => {

    const { data: runners } = useGetRunnerListQuery({ limit: -1 });
    const { data: jobs } = useGetJobListQuery({ limit: -1 });

    const getJobsByRunnerGroupAndOrganization = (organization: string, runnerGroup: string) => {
        if (!runners || !jobs) return [];

        const filteredRunners = runners.filter(
            (runner: Runner) =>
                runner.runner_group === runnerGroup && runner.organization === organization
        );

        if (filteredRunners.length === 0) return [];

        return jobs.filter((job: Job) =>
            filteredRunners.some((runner) => runner.id === job.runner)
        );
    }

    const builds = getJobsByRunnerGroupAndOrganization("csas-dev", "csas-linux");
    const tests = getJobsByRunnerGroupAndOrganization("csas-dev", "csas-linux-test");
    const deploymentsNonProduction = getJobsByRunnerGroupAndOrganization("csas-ops", "csas-linux");
    const deploymentsProduction = getJobsByRunnerGroupAndOrganization("csas-ops", "csas-linux-prod");

    return (
        <Grid2 container spacing={2}>
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
        </Grid2>
    )
}

export default Dashboard