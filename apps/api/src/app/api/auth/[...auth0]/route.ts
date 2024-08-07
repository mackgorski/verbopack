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


import { handleAuth, handleLogin, handleCallback } from '@repo/auth';
import prisma from '../../../../lib/prisma';
import { AfterCallback, Session } from '@auth0/nextjs-auth0';

const afterCallback: AfterCallback = async (req, res, session: Session | null | undefined) => {
    console.log('AfterCallback Session:', JSON.stringify(session, null, 2));
    if (session?.user) {
        const { sub, name, email, picture } = session.user;
        try {
            let user = await prisma.user.findUnique({
                where: { auth0Id: sub },
            });

            if (!user && email) {
                // If user not found by auth0Id, try to find by email
                user = await prisma.user.findUnique({
                    where: { email },
                });

                if (user) {
                    // If found by email, update the auth0Id
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { auth0Id: sub },
                    });
                }
            }

            if (!user) {
                // If still not found, create a new user
                user = await prisma.user.create({
                    data: { auth0Id: sub, name, email, image: picture },
                });
            } else {
                // Update existing user
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { name, email, image: picture },
                });
            }

            console.log('User updated/created successfully:', user);
            
            // Ensure the session contains the user information
            session.user = {
                ...session.user,
                ...user,
            };
        } catch (error) {
            console.error('Error updating/creating user:', error);
            console.error(JSON.stringify(error, null, 2));
        }
    } else {
        console.error('No user in session after login');
    }
    return session;
};

export const GET = handleAuth({
    login: handleLogin({
        returnTo: '/profile'
    }),
    callback: handleCallback({ afterCallback })
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
