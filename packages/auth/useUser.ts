import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';

export function useUser() {
    const { user, error, isLoading } = useAuth0User();
    
    // Log the user object to check its structure
    console.log('User object:', user);
    
    console.log('User data received in useUser hook:', user);
    
    return { user, error, isLoading };
}

export default useUser;
