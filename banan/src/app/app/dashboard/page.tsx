'use client';

import AutomationStatistics from '@/components/automations/AutomationStatistics';
import { usePrefetch as useRunnerPrefetch } from '@/services/runner';
import { usePrefetch as useAutomationPrefetch } from '@/services/automation';
import { usePrefetch as useSasPrefetch } from '@/services/sas';
import { useEffect } from 'react';

export default function Dashboard() {
  // Prefetch funkce z různých slices
  const prefetchRunnerList = useRunnerPrefetch('getRunnerList');
  const prefetchAutomationsList = useAutomationPrefetch('getAutomationList');
  const prefetchSasList = useSasPrefetch('getSASList');

  useEffect(() => {
    function prefetchData() {
      prefetchRunnerList({ limit: 20 }); // Tyhle parametrey by se měli shodovat s těmi na konretní strance aby se použili cashovaná data ideálně to někde centralizovat
      prefetchAutomationsList({ limit: 20 });
      prefetchSasList({ limit: 20 });
    }

    prefetchData();
  }, [prefetchRunnerList, prefetchAutomationsList, prefetchSasList]);

  return <AutomationStatistics />;
}
