'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams() as { id: string };

  return (
    <div>
      <p>Sas id: {id}</p>
    </div>
  );
}
