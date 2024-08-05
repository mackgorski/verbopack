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

// 'use client';

// import { useUser } from '@auth0/nextjs-auth0/client';
// import { useEffect, useState } from 'react';
// import Image from "next/image";

// interface UserProfile {
//     name?: string;
//     email?: string;
//     picture?: string;
//     // emailVerified?: Date;
// }

// export default function Profile() {
//     const { user, isLoading } = useUser();
//     const [profile, setProfile] = useState<UserProfile | null>(null);

//     useEffect(() => {
//         if (user) {
//             fetch('http://localhost:3001/api/user', { credentials: 'include' })
//                 .then(res => res.json())
//                 .then(data => setProfile(data))
//                 .catch(err => console.error('Error fetching user profile:', err));
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
//                     {/* <p>Email Verified: {profile.emailVerified ? 'Yes' : 'No'}</p> */}
//                 </>
//             ) : (
//                 <p>Loading profile...</p>
//             )}
//         </div>
//     );
// }



// 'use client';

// import { useUser } from '@repo/auth';
// import { useEffect, useState } from 'react';
// import Image from "next/image";

// interface UserProfile {
//     name?: string;
//     email?: string;
//     image?: string;
//     emailVerified?: Date;
// }

// export default function Profile() {
//     const { user, isLoading } = useUser();
//     const [profile, setProfile] = useState<UserProfile | null>(null);

//     useEffect(() => {
//         if (user) {
//             fetch('http://localhost:3001/api/user')
//                 .then(res => res.json())
//                 .then(data => setProfile(data))
//                 .catch(err => console.error('Error fetching user profile:', err));
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
//                     <p>Email Verified: {profile.emailVerified ? 'Yes' : 'No'}</p>
//                     {profile.image && <Image src={profile.image} alt={profile.name || 'User'} />}
//                 </>
//             ) : (
//                 <p>Loading profile...</p>
//             )}
//         </div>
//     );
// }



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
                credentials: 'include'
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

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Please login to view this page</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Profile</h1>
            {profile ? (
                <>
                    <p>Name: {profile.name || 'N/A'}</p>
                    <p>Email: {profile.email || 'N/A'}</p>
                    <p>Email Verified: {profile.emailVerified ? 'Yes' : 'No'}</p>
                    {profile.image && <Image src={profile.image} alt={profile.name || 'User'} width={100} height={100} />}
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}
