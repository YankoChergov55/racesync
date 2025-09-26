import type { Request, Response } from 'express';
import type { Prisma, Role } from '@prisma/client';
import { $Enums } from '@prisma/client';

import AppError from '@/utils/appError.js';
import { getUserById, upUserData, delUserData, getAllUsersFromDB } from './user-model.js';
import { excludePassword } from './auth/user-auth-helpers.js';
import logger from '@/utils/logger.js';
import type { filter } from './user-model.js';
import { authorize } from '@/middleware/authMiddleware.js';

type userDetails = Prisma.UserCreateInput;
const roleEnum = $Enums.Role;

export interface userOutput {
	success: boolean;
	status: number;
	message: string;
	user?: userDetails | userDetails[];
	token?: string;
}

export const getUserProfileById = async (req: Request, res: Response<userOutput>) => {
	const { id } = req.params;

	if (!id) {
		throw new AppError(400, 'bad request, invalid id parameter');
	}

	const user = await getUserById(id);

	if (!user) {
		throw new AppError(404, 'user not found');
	}

	res.status(200).json({
		success: true,
		status: 200,
		message: 'user profile',
		user: excludePassword(user),
	});
};

export const updateUser = async (req: Request, res: Response<userOutput>) => {
	const { id } = req.params;
	const data = req.body;

	if (!id) {
		throw new AppError(400, 'bad request, invalid id parameter');
	}

	if (!data) {
		throw new AppError(500, 'nothing to update');
	}

	const updated = await upUserData({ id, data });

	res.status(200).json({
		success: true,
		status: 200,
		message: 'user updated',
		user: excludePassword(updated),
	});
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		throw new AppError(400, 'bad request, invalid id parameter');
	}

	const deleted = await delUserData(id);

	res.status(200).json({
		success: true,
		status: 200,
		message: 'user deleted',
		user: excludePassword(deleted),
	});
};

export const getAllUsersByFilter = async (req: Request, res: Response<userOutput>) => {
	let { role, page, pageSize } = req.query;

	let filter: filter = {};

	if (role) {
		let allCaps = (role as string).toUpperCase() as Role;
		if (Object.values(roleEnum).includes(allCaps)) {
			filter.role = allCaps;
		} else {
			throw new AppError(500, 'no such role exists');
		}
	}

	if (page) {
		filter.page = Number(page);
	}

	if (pageSize) {
		filter.pageSize = Number(pageSize);
	}

	const users = await getAllUsersFromDB(filter);

	const noPassword = users.map(user => excludePassword(user));

	res.status(200).json({
		success: true,
		status: 200,
		message: 'list of users for an admin',
		user: noPassword,
	});
};
