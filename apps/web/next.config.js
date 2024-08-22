const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['s.gravatar.com'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                child_process: false,
                dns: false,
                punycode: false,
            };
        }

        // Allow dynamic imports from RudderStack domains
        config.module.rules.push({
            test: /\.m?js$/,
            type: 'javascript/auto',
            resolve: {
                fullySpecified: false,
            },
        });

        return config;
    },
    env: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY: process.env.RUDDERSTACK_WRITE_KEY,
        NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL: process.env.RUDDERSTACK_DATA_PLANE_URL,
    },
};

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable');
}

if (!process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY environment variable');
}

if (!process.env.NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL) {
    throw new Error('Missing NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE_URL environment variable');
}

module.exports = withBundleAnalyzer(nextConfig);
