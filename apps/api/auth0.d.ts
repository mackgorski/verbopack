// import type { Session } from '@auth0/nextjs-auth0';
// import type { Session as Auth0Session } from '@auth0/nextjs-auth0'
import type { Claims, Session as Auth0Session } from '@auth0/nextjs-auth0';

declare module '@auth0/nextjs-auth0' {
    interface Session extends Auth0Session {
        user: Claims & {
            sub: string;
            email: string;
            name: string;
            picture: string;
            email_verified: boolean;
            user_id: string;
        };
        returnTo?: string;
    }
}
