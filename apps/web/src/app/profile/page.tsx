'use client';

import { useAuth } from '@/lib/auth';
import Image from 'next/image';

export default function Profile() {
  const { isLoading, user, error } = useAuth();

    return (
        <main className="p-4" aria-label="User profile">
            <h1 className="text-2xl font-bold mb-4" aria-label="Profile heading">Profile</h1>
            {isLoading ? (
                <p className="text-gray-600" aria-live="polite">Loading...</p>
            ) : error ? (
                <p className="text-red-500" role="alert">Error: {error.message}</p>
            ) : user ? (
                <section className="space-y-2" aria-label="Profile details">
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
                    {user.picture && (
                        <figure className="mt-4 relative">
                            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 animate-pulse"></div>
                            <Image
                                src={user.picture || ''}
                                alt={`Profile picture of ${user.name || 'user'}`}
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
