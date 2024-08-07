'use client';

import { useUser } from '@repo/auth';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface UserProfile {
    name?: string;
    email?: string;
    image?: string;
    emailVerified?: Date | null;
}

export default function Profile() {
    const { user, error: userError, isLoading } = useUser();
    console.log('User object from API:', user);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (user) {
            setProfile({
                name: user?.name ?? '',
                email: user?.email ?? '',
                image: user?.picture ?? '',
                emailVerified: user?.email_verified ? new Date(user.email_verified) : null,
            });
        }
    }, [user]);

    return (
        <main className="p-4" aria-label="User profile">
            <h1 className="text-2xl font-bold mb-4" aria-label="Profile heading">Profile</h1>
            {isLoading ? (
                <p className="text-gray-600" aria-live="polite">Loading...</p>
            ) : !user ? (
                <p className="text-red-500" role="alert">Please log in to view this page</p>
            ) : userError ? (
                <p className="text-red-500" role="alert">Error: {userError.message}</p>
            ) : profile ? (
                <section className="space-y-2" aria-label="Profile details">
                    <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
                    <p><strong>Email Verified:</strong> {profile.emailVerified ? 'Yes' : 'No'}</p>
                    {profile.image && (
                        <figure className="mt-4 relative">
                            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 animate-pulse"></div>
                            <Image
                                src={profile.image || ''}
                                alt={`Profile picture of ${profile.name || 'user'}`}
                                width={100}
                                height={100}
                                className="rounded-full absolute top-0 left-0"
                                onLoadingComplete={(img) => img.classList.remove('opacity-0')}
                                style={{ opacity: 0, transition: 'opacity 0.3s' }}
                            />
                        </figure>
                    )}
                </section>
            ) : (
                <p className="text-gray-600" aria-live="polite">Loading profile...</p>
            )}
        </main>
    );
}
