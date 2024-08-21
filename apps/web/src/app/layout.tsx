'use client'

import React from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import 'ui/dist/globals.css';
import { initRudderStack } from '@repo/analytics';

// Initialize RudderStack
initRudderStack(process.env.RUDDERSTACK_WRITE_KEY!, process.env.RUDDERSTACK_DATA_PLANE_URL!);

function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (user && !user.unsafeMetadata.onboardingComplete) {
      router.push('/onboarding');
    }
  }, [user, router]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
            <OnboardingCheck>{children}</OnboardingCheck>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}