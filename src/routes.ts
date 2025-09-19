import { Router } from 'express';
import { healthRoutes } from './features/health-check/health-check-route.js';
import { raceRoutes } from './features/racing/race-routes.js';

export const V1 = Router();

V1.use('/health-check', healthRoutes);
V1.use('/racing', raceRoutes);
