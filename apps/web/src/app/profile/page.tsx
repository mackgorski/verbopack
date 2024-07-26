// 'use client';

// import { useUser } from '@repo/auth';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// interface UserProfile {
//     name?: string;
//     email?: string;
//     picture?: string;
// }

// export default function Profile() {
//     const { user, isLoading } = useUser();
//     const [profile, setProfile] = useState<UserProfile | null>(null);

//     useEffect(() => {
//         if (user) {
//             fetch('/api/user')
//                 .then(res => res.json())
//                 .then(data => setProfile(data));
//         }
//     }, [user]);

//     if (isLoading) return <div>Loading...</div>;
//     if (!user) return <div>Please login to view this page</div>;

//     return (
//         <div>
//             <h1>Profile</h1>
//             {profile ? (
//                 <>
//                     <p>Name: {profile.name}</p>
//                     <p>Email: {profile.email}</p>
//                     {profile.picture && <Image src={profile.picture} alt={profile.name || 'User'} />}
//                 </>
//             ) : (
//                 <p>Loading profile...</p>
//             )}
//         </div>
//     );
// }

'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import Image from "next/image";

interface UserProfile {
    name?: string;
    email?: string;
    picture?: string;
}

export default function Profile() {
    const { user, isLoading } = useUser();
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (user) {
            fetch('http://localhost:3001/api/user', { credentials: 'include' })
                .then(res => res.json())
                .then(data => setProfile(data))
                .catch(err => console.error('Error fetching user profile:', err));
        }
    }, [user]);

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Please login to view this page</div>;

    return (
        <div>
            <h1>Profile</h1>
            {profile ? (
                <>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    {profile.picture && <Image src={profile.picture} alt={profile.name || 'User'} />}
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}