import { enhance } from '@zenstackhq/runtime';

const config = {
    enhance,
    // Specify the path to your schema file
    schema: './schema.zmodel',
    // Specify the output directory for generated files
    outDir: '../../node_modules/.zenstack',
    plugins: [
        {
            name: 'zod-prisma',
            provider: {
                fromPackage: '@zenstackhq/zod-prisma',
            },
        },
    ],
};

export default config;

