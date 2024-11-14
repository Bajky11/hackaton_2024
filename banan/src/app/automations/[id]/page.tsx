'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();

  return (
    <div>
      <h3>Jedna konkrétní automatizace</h3>
      <p>Automation id: {id}</p>
    </div>
  );
}
