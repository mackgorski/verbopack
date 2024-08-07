// import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';

// export function middleware() {
//     const response = NextResponse.next();

//     // Add CORS headers
//     response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     response.headers.set('Access-Control-Allow-Credentials', 'true');

//     return response;
// }

// export const config = {
//     matcher: '/api/:path*',
// };

// TODO: Cleanup file

// import { NextResponse } from 'next/server';

import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';

export async function middleware(request: Request) {
    const response = NextResponse.next();

    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // Check if the request is for the user API
    if (request.url.includes('/api/user')) {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }
    }

    return response;
}

export const config = {
    matcher: '/api/:path*',
}

// export const config = {
//     matcher: '/api/:path*',
// };
