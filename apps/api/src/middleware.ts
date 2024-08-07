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
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    // Handle OPTIONS request
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
}

export const config = {
    matcher: '/api/:path*',
};

// export const config = {
//     matcher: '/api/:path*',
// };
