import { Metadata } from 'next'
import { Divider } from "@nextui-org/react";
import ClientComponent from '../components/ClientComponent';

export const metadata: Metadata = {
    title: 'My Next.js App',
    description: 'Welcome to my Next.js app!',
}

export default function Home() {
    return (
        <main>
            <h1>Welcome to My Next.js App</h1>
            <Divider />
            <ClientComponent />
        </main>
    );
}