// import { handleAuth, handleCallback, handleLogin, AfterCallback, Session } from '@auth0/nextjs-auth0';
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';

// const afterCallback: AfterCallback = async (_req: NextApiRequest, _res: NextApiResponse, session: Session | null | undefined) => {
//     if (session?.user) {
//         const { sub, name, email, picture } = session.user;
//         try {
//             await prisma.user.upsert({
//                 where: { auth0Id: sub },
//                 update: { name, email, image: picture },
//                 create: { auth0Id: sub, name, email, image: picture },
//             });
//             console.log('User saved/updated in database');
//         } catch (error) {
//             console.error('Error saving user to database:', error);
//         }
//     }
//     if (session === null) {
//         return undefined;
//     }
//     return session;
// };

// export const GET = handleAuth({
//     callback: handleCallback({
//         afterCallback,
//     }),
//     login: handleLogin({
//         authorizationParams: {
//             scope: 'openid profile email',
//         },
//         returnTo: '/profile',
//     }),
// });

// export const POST = handleAuth();


import { handleAuth, handleCallback, handleLogin, AfterCallback, Session } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';
import prisma from '../../../../lib/prisma';

const afterCallback: AfterCallback = async (req: NextRequest, session: Session | null) => {
    if (session?.user) {
        const { sub, name, email, picture } = session.user;
        await prisma.user.upsert({
            where: { auth0Id: sub },
            update: { name, email, image: picture },
            create: { auth0Id: sub, name, email, image: picture },
        });
    }
    if (session === null) {
        return undefined;
    }
    return session;
};

export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            scope: 'openid profile email',
        },
        returnTo: '/profile',
    }),
    callback: handleCallback({
        afterCallback,
        redirectUri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
    }),
});

export const POST = handleAuth();