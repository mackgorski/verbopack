import { NextApiRequest, NextApiResponse } from 'next';
import { handleLogout } from '@auth0/nextjs-auth0';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleLogout(req, res);
  } catch (error) {
    console.error('Error in /api/auth/logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
