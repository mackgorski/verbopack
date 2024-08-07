'use client';

import { useUser } from '@repo/auth';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`
                },
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

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            {isLoading ? (
                <p className="text-gray-600" aria-live="polite">Loading...</p>
            ) : !user ? (
                <p className="text-red-500" role="alert">Please log in to view this page</p>
            ) : error ? (
                <p className="text-red-500" role="alert">Error: {error}</p>
            ) : profile ? (
                <section className="space-y-2">
                    <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
                    <p><strong>Email Verified:</strong> {profile.emailVerified ? 'Yes' : 'No'}</p>
                    {profile.image && (
                        <figure className="mt-4 relative">
                            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 animate-pulse"></div>
                            <Image 
                                src={profile.image} 
                                alt={`Profile picture of ${profile.name || 'user'}`} 
                                width={100} 
                                height={100} 
                                className="rounded-full absolute top-0 left-0"
                                onLoadingComplete={(img) => img.classList.remove('opacity-0')}
                                style={{ opacity: 0, transition: 'opacity 0.3s' }}
                            />
                        </figure>
                    )}
                </section>
            ) : (
                <p className="text-gray-600" aria-live="polite">Loading profile...</p>
            )}
        </main>
    );
}
