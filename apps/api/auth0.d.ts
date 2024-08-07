// import type { Session } from '@auth0/nextjs-auth0';
// import type { Session as Auth0Session } from '@auth0/nextjs-auth0'
import type { Claims } from '@auth0/nextjs-auth0';


declare module '@auth0/nextjs-auth0' {
    interface Session {
        user: Claims & {
            // Ensure the required user properties are included
            email: string;
            name: string;
            picture: string;
        };
    }
}
