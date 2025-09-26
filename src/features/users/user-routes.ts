import { Router } from 'express';

import { asyncHandler } from '@/utils/async-handler.js';

import { getUserProfileById, updateUser, deleteUser, getAllUsersByFilter } from './user-controller.js';
import { authenticate, authorize, canElevate, canDelete, canView } from '@/middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', authorize, asyncHandler(getAllUsersByFilter));
router.get('/:id', canView, asyncHandler(getUserProfileById));
router.put('/put/:id', canElevate, asyncHandler(updateUser));
router.patch('/patch/:id', canElevate, asyncHandler(updateUser));
router.delete('/id', canDelete, asyncHandler(deleteUser));

export { router as userRoutes };
