import { Router } from 'express';

import { asyncHandler } from '@/utils/async-handler.js';

import { createRace, getRace, updateRace, deleteRace, getRacesByParam } from './race-controller.js';

const router = Router();

router.post('/new', asyncHandler(createRace));
router.get('/:id', asyncHandler(getRace));
router.patch('/patch/:id', asyncHandler(updateRace));
router.put('/put/:id', asyncHandler(updateRace));
router.delete('/:id', asyncHandler(deleteRace));

router.get('/', asyncHandler(getRacesByParam));

export { router as raceRoutes };
