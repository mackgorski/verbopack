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

// NOTE: THIS WORKED!!!!!
// import { handleAuth, handleLogin, handleCallback } from '@repo/auth';
// import { NextRequest } from 'next/server';
// import prisma from '../../../../lib/prisma';

// export const GET = handleAuth({
//     login: handleLogin({
//         returnTo: '/profile'
//     }),
//     callback: handleCallback({
//         async afterCallback(req: NextRequest, session) {
//             if (session?.user) {
//                 const { sub, name, email, picture } = session.user;
//                 await prisma.user.upsert({
//                     where: { auth0Id: sub },
//                     update: { name, email, image: picture },
//                     create: { auth0Id: sub, name, email, image: picture },
//                 });
//             }
//             if (session === null) {
//                 return undefined;
//             }
//             return session;
//         }
//     })
// });

// export const POST = handleAuth();


// NOTES: THIS WORKS!!!!


import { handleAuth, handleLogin, handleCallback, AfterCallback, Session } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

const afterCallback: AfterCallback = async (req: NextRequest, res: NextResponse, session: Session | null | undefined) => {
    if (session?.user) {
        const { sub, name, email, picture } = session.user;
        try {
            const user = await prisma.user.upsert({
                where: { auth0Id: sub },
                update: { name, email, image: picture },
                create: { auth0Id: sub, name, email, image: picture },
            });
            console.log('User updated/created successfully:', user);
        } catch (error) {
            console.error('Error updating/creating user:', error);
        }
    }
    return session;
};

export const GET = handleAuth({
    login: handleLogin({
        returnTo: '/profile'
    }),
    callback: handleCallback({
        afterCallback,
    })
});

export const POST = handleAuth();



// import { handleAuth, handleLogin, handleCallback, AfterCallback, Session } from '@auth0/nextjs-auth0';
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';

// const afterCallback: AfterCallback = async (_req: NextApiRequest, _res: NextApiResponse, session: Session | null) => {
//     if (session?.user) {
//         const { sub, name, email, picture, email_verified } = session.user;
//         await prisma.user.upsert({
//             where: { auth0Id: sub },
//             update: {
//                 name,
//                 email,
//                 image: picture,
//                 emailVerified: email_verified ? new Date() : null
//             },
//             create: {
//                 auth0Id: sub,
//                 name,
//                 email,
//                 image: picture,
//                 emailVerified: email_verified ? new Date() : null
//             },
//         });
//     }
//     if (session === null) {
//         return undefined;
//     }
//     return session;
// };

// export const GET = handleAuth({
//     login: handleLogin({
//         returnTo: '/profile'
//     }),
//     callback: handleCallback({
//         afterCallback,
//     })
// });

// export const POST = handleAuth();
