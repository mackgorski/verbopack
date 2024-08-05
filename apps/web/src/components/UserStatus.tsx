'use client';

import { useUser } from '@repo/auth';
import Link from 'next/link';

export default function UserStatus() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {user ? (
                <>
                    <p>Hello, {user.name}!</p>
                    <Link href="/api/auth/logout">Logout</Link>
                </>
            ) : (
                <Link href="/api/auth/login">Login</Link>
            )}
        </div>
    );
}
