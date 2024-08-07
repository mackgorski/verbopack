import { NextApiRequest, NextApiResponse } from 'next';
import { handleCallback } from '@auth0/nextjs-auth0';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleCallback(req, res);
  } catch (error) {
    console.error('Error in /api/auth/callback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
