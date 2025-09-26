import { Router } from 'express';
import { asyncHandler } from '@/utils/async-handler.js';
import { login, logout, register } from './user-auth.js';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/logout', asyncHandler(logout));

export { router as authRoutes };
