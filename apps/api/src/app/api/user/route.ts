// import { getSession } from '@auth0/nextjs-auth0';
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../lib/prisma';

// export async function GET(req: NextRequest) {
//     try {
//         const res = new NextResponse();
//         const session = await getSession(req, res);

//         if (!session?.user) {
//             return NextResponse.json(
//                 { error: 'Not authenticated' },
//                 { status: 401 }
//             );
//         }

//         const user = await prisma.user.findUnique({
//             where: { auth0Id: session.user.sub },
//         });

//         return NextResponse.json(user);
//     } catch (error) {
//         console.error('Error in user route:', error);
//         return NextResponse.json(
//             { error: 'Internal Server Error' },
//             { status: 500 }
//         );
//     }
// }


// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from '@auth0/nextjs-auth0';
// import prisma from '../../../lib/prisma';

// export async function GET(req: NextRequest) {
//     try {
//         const res = new NextResponse();
//         const session = await getSession(req, res);
//         if (session?.user) {
//             const user = await prisma.user.findUnique({
//                 where: { auth0Id: session.user.sub },
//             });
//             if (user) {
//                 return NextResponse.json(user);
//             } else {
//                 return NextResponse.json({ error: 'User not found' }, { status: 404 });
//             }
//         } else {
//             return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
//         }
//     } catch (error) {
//         console.error('Error in user route:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }

// TODO: Cleanup the file

// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from '@auth0/nextjs-auth0';
// import prisma from '../../../lib/prisma';

// export async function GET(req: NextRequest) {
//     try {
//         const res = new NextResponse();
//         const session = await getSession(req, res);
//         console.log('Session:', session); // Add this line for debugging
//         if (session?.user?.sub) {
//             const user = await prisma.user.findUnique({
//                 where: { auth0Id: session.user.sub },
//             });
//             if (user) {
//                 return NextResponse.json(user);
//             } else {
//                 console.log('User not found in database');
//                 return NextResponse.json({ error: 'User not found' }, { status: 404 });
//             }
//         } else {
//             console.log('No session or user sub');
//             return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
//         }
//     } catch (error) {
//         console.error('Error in user route:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }



// NOTE: THIS WORKED!!!
// import { withApiAuthRequired, getSession } from '@repo/auth';
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '../../../lib/prisma';

// export const GET = withApiAuthRequired(async function handler(req: NextRequest) {
//     const session = await getSession(req);
//     if (session?.user) {
//         const user = await prisma.user.findUnique({
//             where: { auth0Id: session.user.sub },
//         });
//         return NextResponse.json(user);
//     }
//     return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
// });


import { NextResponse } from 'next/server';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '../../../lib/prisma';

export const GET = withApiAuthRequired(async function route(req) {
    try {
        const session = await getSession();
        console.log('Session:', JSON.stringify(session, null, 2));

        if (!session || !session.user) {
            console.log('Session or user is null/undefined');
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        console.log('Session user:', JSON.stringify(session.user, null, 2));

        let auth0Id = session.user.sub;
        if (!auth0Id && session.user.id) {
            auth0Id = session.user.id;
        }
        console.log('Auth0 ID:', auth0Id);

        if (!auth0Id) {
            console.log('Auth0 ID is null/undefined');
            // If auth0Id is not available, try to use email as a fallback
            if (session.user.email) {
                let user = await prisma.user.findUnique({
                    where: { email: session.user.email },
                });
                if (user) {
                    return NextResponse.json(user);
                }
            }
            // If we still can't identify the user, return an error
            return NextResponse.json({ error: 'Unable to identify user' }, { status: 400 });
        }

        let user = await prisma.user.findUnique({
            where: { auth0Id },
        });

        if (!user) {
            console.log('User not found in database for auth0Id:', auth0Id);
            // Try to find user by email as a fallback
            if (session.user.email) {
                user = await prisma.user.findUnique({
                    where: { email: session.user.email },
                });
                if (user) {
                    // Update the auth0Id if found by email
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { auth0Id },
                    });
                    console.log('User found by email and updated:', JSON.stringify(user, null, 2));
                }
            }
            if (!user) {
                // If still not found, create a new user
                user = await prisma.user.create({
                    data: {
                        auth0Id,
                        name: session.user.name || '',
                        email: session.user.email || '',
                        image: session.user.picture || null,
                    },
                });
                console.log('New user created:', JSON.stringify(user, null, 2));
            }
        } else {
            console.log('User found:', JSON.stringify(user, null, 2));
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error in user route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
});
