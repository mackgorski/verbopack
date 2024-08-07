import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req, res);
    if (!session || !session.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    res.status(200).json(session.user);
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
