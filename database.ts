import appConfig from './src/config/appConfig.js';
import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

/**
 * A globally shared instance of PrismaClient.
 *
 * This export ensures that only one instance of PrismaClient is created and reused
 * throughout the application, preventing multiple connections especially during
 * development with hot reloads. In production, a single PrismaClient instance is used.
 *
 * Usage:
 * ```
 * import { prisma } from './database';
 * const users = await prisma.user.findMany();
 * ```
 */
export const prisma = globalThis.prisma || new PrismaClient();

if (appConfig.nodeEnv !== 'production') {
	globalThis.prisma = prisma;
}
