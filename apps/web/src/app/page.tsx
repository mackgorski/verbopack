import type { ReactElement } from 'react';
import { Metadata } from 'next'
import { Divider } from "@nextui-org/react";

export const metadata: Metadata = {
    title: 'My Next.js App',
    description: 'Welcome to my Next.js application',
}

export default function Home(): ReactElement {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Welcome to My Next.js App</h1>
            <Divider className="my-4" />
            <p>This is the main page of your application.</p>
        </main>
    )
}