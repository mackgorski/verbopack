'use client';

import { useUser } from '@repo/auth';
import { useEffect, useState } from 'react';
import Image from "next/image";

interface UserProfile {
    name?: string;
    email?: string;
    image?: string;
    emailVerified?: Date | null;
}

export default function Profile() {
    const { user, isLoading } = useUser();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            fetch('http://localhost:3001/api/user', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}` // Add this line
                },
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setProfile(data);
                })
                .catch(err => {
                    console.error('Error fetching user profile:', err);
                    setError(err.message);
                });
        }
    }, [user]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : !user ? (
                <p className="text-red-500">Please log in to view this page</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : profile ? (
                <div className="space-y-2">
                    <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
                    <p><strong>Email Verified:</strong> {profile.emailVerified ? 'Yes' : 'No'}</p>
                    {profile.image && (
                        <div className="mt-4">
                            <Image src={profile.image} alt={profile.name || 'User'} width={100} height={100} className="rounded-full" />
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">Loading profile...</p>
            )}
        </div>
    );
}
