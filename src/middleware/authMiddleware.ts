import type { NextFunction, Request, Response } from 'express';
import { getJwtTokenFromCookie } from '@/features/users/auth/user-auth-helpers.js';
import { getUserById } from '@/features/users/user-model.js';
import AppError from '@/utils/appError.js';
import { Role } from '@prisma/client';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	try {
		getJwtTokenFromCookie(req);
		next();
	} catch (error) {
		throw new AppError(401, 'not authenticated');
	}
};

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const decoded = getJwtTokenFromCookie(req);
		const user = await getUserById(decoded.id);

		if (user && user.role === 'USER') {
			throw new AppError(401, 'unauthorized, no access to this resource');
		}

		next();
	} catch (error) {
		throw new AppError(500, 'something went wrong when authorizing');
	}
};

export const canElevate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const decoded = getJwtTokenFromCookie(req);
		const user = await getUserById(decoded.id);
		const { role } = req.body;

		if (user && role && user.role !== 'ADMIN') {
			throw new AppError(401, 'role change not allowed for the logged in user');
		}

		next();
	} catch (error) {
		throw new AppError(500, 'role change not working');
	}
};

export const canView = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const decoded = getJwtTokenFromCookie(req);
		const user = await getUserById(decoded.id);
		const { id } = req.params;

		if (id && user) {
			if (id !== user.id && user.role === Role.USER) {
				throw new AppError(401, 'only admins can view profiles of other users on this level');
			}
		}

		next();
	} catch (error) {
		throw new AppError(500, 'something went wrong');
	}
};

export const canDelete = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const decoded = getJwtTokenFromCookie(req);
		const user = await getUserById(decoded.id);
		const { id } = req.params;

		if (id && user) {
			if (id !== user.id && user.role !== Role.ADMIN) {
				throw new AppError(401, 'unauthorized: admins can delete other users profiles only');
			}
		}

		next();
	} catch (error) {
		throw new AppError(500, 'something went wrong');
	}
};
