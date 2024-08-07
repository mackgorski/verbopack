// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     experimental: {
//         appDir: true,
//     },
//     // transpilePackages: ["@repo/ui", "@repo/auth"],
//     async rewrites() {
//         return [
//             {
//                 source: '/api/:path*',
//                 destination: 'http://localhost:3001/api/:path*',
//             },
//         ];
//     },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3001/api/:path*',
            },
            // Add a rewrite for the /profile route
            {
                source: '/profile',
                destination: '/api/user',
            },
        ];
    },
    images: {
        domains: ['s.gravatar.com', 'cdn.auth0.com'],
    },
};

module.exports = nextConfig;
