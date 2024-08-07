import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const session = await getSession(req, new NextResponse());

        if (!session?.user) {
            return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
        }

        const user = session.user;

        return NextResponse.json({
            id: user.user_id,
            name: user.name,
            email: user.email,
            image: user.picture,
            emailVerified: user.email_verified,
        }, {
            status: 200,
        });
    } catch (error) {
        console.error('Error in user route:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
    
    console.log('Session object:', session);
    console.log('User object from session:', session?.user);
    
    if (session?.user) {
        console.log('User data returned from API:', {
            id: session.user.user_id,
            name: session.user.name, 
            email: session.user.email,
            image: session.user.picture,
            emailVerified: session.user.email_verified,
        });
    }
}
