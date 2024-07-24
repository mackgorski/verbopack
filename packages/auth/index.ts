import initAuth0 from './initAuth0';
export { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export const auth0 = initAuth0;