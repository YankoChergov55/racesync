import { Router } from 'express';
import { healthRoutes } from './features/health-check/health-check-route.js';
import { raceRoutes } from './features/racing/race-routes.js';
import { authRoutes } from './features/users/auth/user-auth-routes.js';
import { userRoutes } from './features/users/user-routes.js';

const router = Router();

router.use('/health-check', healthRoutes);
router.use('/racing', raceRoutes);
router.use('/users/auth', authRoutes);
router.use('/users', userRoutes);

export { router as V1 };
