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

export const GET = withApiAuthRequired(async function route() {
    try {
        const session = await getSession();

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const auth0Id = session.user.sub;

        if (!auth0Id) {
            return NextResponse.json({ error: 'Unable to identify user' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { auth0Id },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error in user route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
});
