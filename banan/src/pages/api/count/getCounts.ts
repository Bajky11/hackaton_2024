import { NextApiRequest, NextApiResponse } from 'next';

const AUTH_HEADER = `Basic ${Buffer.from('dopo:DevOps2024').toString('base64')}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const url = req.body?.url;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Valid URL is required' });
  }

  try {
    const response = await fetch(url, {
      headers: { Authorization: AUTH_HEADER, Accept: 'application/json' },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const parseHeader = (header: string | null) =>
      header ? parseInt(header, 10) || null : null;
    const totalCount = parseHeader(response.headers.get('X-Total-Count'));
    const filteredCount = parseHeader(response.headers.get('X-Filtered-Count'));

    return res.status(200).json({ totalCount, filteredCount });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
