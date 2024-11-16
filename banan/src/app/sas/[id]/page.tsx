'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();

  return (
    <div>
      <h3>Jeden sas</h3>
      <p>Sas id: {id}</p>
    </div>
  );
}
