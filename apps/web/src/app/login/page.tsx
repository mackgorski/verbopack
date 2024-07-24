'use client';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/api/auth/login');
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Log in with Auth0</button>
        </div>
    );
}