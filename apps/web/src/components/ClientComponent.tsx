'use client';
import { useState, useEffect } from 'react';

export default function ClientComponent() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/hello', {
            credentials: 'include',
        })
            .then(res => {
                console.log('Response status:', res.status);
                return res.json();
            })
            .then(data => {
                console.log('Received data:', data);
                setMessage(data.message);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return <p>{message || 'Loading...'}</p>;
}