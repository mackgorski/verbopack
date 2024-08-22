'use client'

import React, { useEffect } from 'react';
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
import { z } from 'zod';
import Script from 'next/script';

const BasicInfoSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  onboardingComplete: z.boolean().optional(),
  createdAt: z.string().optional(),
});

type BasicInfo = z.infer<typeof BasicInfoSchema>;

const IdentifyTraitsSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  onboardingComplete: z.boolean().optional(),
  createdAt: z.string().optional(),
});

type IdentifyTraits = z.infer<typeof IdentifyTraitsSchema>;

function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (!user.unsafeMetadata.onboardingComplete) {
        router.push('/onboarding');
      }
    }
  }, [user, router]);

  return <>{children}</>;
}

function IdentifyUser({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const traits: BasicInfo = {
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        name: `${user.firstName} ${user.lastName}`,
        onboardingComplete: user.unsafeMetadata.onboardingComplete as boolean | undefined,
        createdAt: user.createdAt ? user.createdAt.toISOString() : undefined,
      };

      BasicInfoSchema.parse(traits);

      const identifyTraits: IdentifyTraits = {
        ...traits,
      };

      IdentifyTraitsSchema.parse(identifyTraits);
    }
  }, [user]);

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
        <head>
          <Script id='bufferEvents'>
            {`
              window.rudderanalytics = [];
              var methods = [
                'setDefaultInstanceKey',
                'load',
                'ready',
                'page',
                'track',
                'identify',
                'alias',
                'group',
                'reset',
                'setAnonymousId',
                'startSession',
                'endSession',
                'consent'
              ];
              for (var i = 0; i < methods.length; i++) {
                var method = methods[i];
                window.rudderanalytics[method] = (function (methodName) {
                  return function () {
                    window.rudderanalytics.push([methodName].concat(Array.prototype.slice.call(arguments)));
                  };
                })(method);
              }
              // Below line is only for demonstration purpose, SPA code is better place for auto page call
              window.rudderanalytics.page('sample page call');
          `}
          </Script>
        </head>
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
            <OnboardingCheck>
              <IdentifyUser>
                {children}
              </IdentifyUser>
            </OnboardingCheck>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}