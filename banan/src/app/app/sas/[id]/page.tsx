'use client';

import { Box, Grid2, Typography } from '@mui/material';
import AutomationInSAS from '@/components/sas/AutomationInSAS';
import { useParams } from 'next/navigation';
import RunnersSuccessWidget from '@/components/dashboard/components/RunnersSuccessWidget';
import { useGetRunnerListQuery, useGetJobListQuery, useGetMetricWithRunnerListQuery, Runner, Job } from '@/services/runner';
import { QueryOperator } from '@/services/settings';
import JobsDataGrid from '@/components/tables/JobsTable/JobsDataGrid';

export default function SasDetailPage(): JSX.Element {
  const { id } = useParams() as { id: string };

  const { data: runners, isFetching: runnersLoading } = useGetRunnerListQuery({ limit: -1 });
  const { data: jobs } = useGetJobListQuery({ limit: -1, query: [{ property: "SAS", operator: QueryOperator.EQ, value: id }] });

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
          {id}
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
          subtitle='NON-PRODUCTION'
          data={deploymentsNonProduction}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 3 }}  >
        <RunnersSuccessWidget
          title="DEPLOYMENTS"
          subtitle='PRODUCTION'
          color="#4BA43A"
          data={deploymentsProduction}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }}  >
        <JobsDataGrid query={[{ property: "SAS", operator: QueryOperator.EQ, value: id }]} navigate={true} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }}  >
        <AutomationInSAS />
      </Grid2>


    </Grid2>

    // <Box padding={2}>
    //   <Typography fontSize={30} fontWeight="bold" marginBottom={2}>
    //     Detail SAS: {id}
    //   </Typography>
    //   <Box
    //     display="flex"
    //     flexWrap={{
    //       xs: 'wrap',
    //       md: 'nowrap',
    //     }} /* Přizpůsobení na malých zařízeních */
    //     gap={2}
    //   >
    //     {/* Jobs sekce */}
    //     <Box
    //       flex={{
    //         xs: '1 1 100%',
    //         md: '2',
    //       }} /* Na mobilu 100% šířky, jinak 2/3 */
    //       flexBasis={{ xs: '100%', md: '66.66%' }}
    //     >
    //       <JobInSAS />
    //     </Box>
    //     {/* Automations sekce */}
    //     <Box
    //       flex={{
    //         xs: '1 1 100%',
    //         md: '1',
    //       }} /* Na mobilu 100% šířky, jinak 1/3 */
    //       flexBasis={{ xs: '100%', md: '33.33%' }}
    //     >
    //       <AutomationInSAS />
    //     </Box>
    //   </Box>
    // </Box>
  );
}
