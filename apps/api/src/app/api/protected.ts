import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@repo/auth';

export default withApiAuthRequired(async function myApiRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession(req, res);
    res.json({ message: 'This is a protected API route', userId: session?.user?.sub });
});