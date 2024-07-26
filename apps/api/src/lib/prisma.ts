// import { PrismaClient } from '@prisma/client';
// import { enhance } from '@zenstackhq/runtime';

// const prisma = new PrismaClient();
// export default enhance(prisma);

import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';

declare global {
    let prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!(global as NodeJS.Global & { prisma?: PrismaClient }).prisma) {
        (global as NodeJS.Global & { prisma?: PrismaClient }).prisma = new PrismaClient();
    }
    prisma = (global as NodeJS.Global & { prisma?: PrismaClient }).prisma!;
}

prisma.$connect().catch((err) => {
    console.error('Failed to connect to the database', err);
});

export default enhance(prisma);