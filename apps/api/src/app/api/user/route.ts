import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('Incoming request:', req);

        const session = await getSession(req, res);

        console.log('Session:', session);
        console.log('Session User:', session?.user);

        if (!session?.user) {
            console.log('No session or user sub');
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const userEmail = session.user.email;
        console.log('User Email:', userEmail);

        if (!userEmail) {
            console.log('User email is undefined');
            return res.status(400).json({ error: 'User email is undefined' });
        }

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return only necessary user information
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.emailVerified,
        });
    } catch (error) {
        console.error('Error in user route:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}