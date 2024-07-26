import { Metadata } from 'next';
// import Link from 'next/link';
import { Divider } from "@nextui-org/react";
import ClientComponent from '../components/ClientComponent';
import UserStatus from '../components/UserStatus';

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
            <UserStatus />
        </main>
    );
}