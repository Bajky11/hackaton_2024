'use client';
import { useGetAutomationsQuery } from '@/services/automation';
import React from 'react';

const Automations = () => {
  const { data, error, isLoading } = useGetAutomationsQuery();

  return (
    <>
      {data &&
        data.map((automation, i) => (
          <div key={i} style={{ paddingBottom: '20px' }}>
            <p>{automation.type}</p>
            <p>{automation.state}</p>
            <p>{automation.last_activity}</p>
          </div>
        ))}
    </>
  );
};

export default Automations;
