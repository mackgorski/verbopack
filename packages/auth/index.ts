import initAuth0 from './initAuth0';

export { default as initAuth0 } from './initAuth0';
export { handleAuth, handleLogin, handleCallback, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
export { UserProvider } from '@auth0/nextjs-auth0/client';
export { default as useUser } from './useUser';

export const auth0 = initAuth0;

