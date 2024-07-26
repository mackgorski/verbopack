'use client';

import { useUser } from '@repo/auth';
import Link from 'next/link';

export default function UserStatus() {
    const { user, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {user ? (
                <>
                    <p>Hello, {user.name}!</p>
                    <Link href="/api/auth/logout">Logout</Link>
                </>
            ) : (
                <Link href="/api/auth/login">Login</Link>
            )}
        </>
    );
}