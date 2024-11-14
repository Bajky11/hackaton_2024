'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return <h3>Sases</h3>;
  // doplnit sas
  // router.push(`/sas/${sas.id}`);
}
