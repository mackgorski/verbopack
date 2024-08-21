'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { trackPageView } from '@repo/analytics';

export default function Dashboard() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    React.useEffect(() => {
        if (isLoaded && user && !user.unsafeMetadata.onboardingComplete) {
            router.push('/onboarding');
        } else if (isLoaded && user) {
            trackPageView('Dashboard', { accountType: user.unsafeMetadata.accountType as string });
        }
    }, [isLoaded, user, router]);

    if (!isLoaded || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.firstName}!</p>
            <p>Account Type: {user.unsafeMetadata.accountType as string}</p>
        </div>
    );
}