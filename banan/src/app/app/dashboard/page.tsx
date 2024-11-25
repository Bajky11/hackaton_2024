'use client';

import Layout from '@/components/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
// import AutomationStatistics from '@/components/automations/AutomationStatistics';

// export default function Dashboard() {
//   return <AutomationStatistics />;
// }

import React from 'react'

const page = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

export default page
