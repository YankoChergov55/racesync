import type { Request, Response } from 'express';
import { getUserByEmail, saveUserToDB } from '../user-model.js';
import {
	clearJwtCookie,
	generateJwtToken,
	hashPassword,
	isPasswordValid,
	setJwtCookie,
	excludePassword,
} from './user-auth-helpers.js';
import AppError from '@/utils/appError.js';
import type { userOutput } from '../user-controller.js';
import { $Enums, type Role } from '@prisma/client';

const roleEnum = $Enums.Role;

export const register = async (req: Request, res: Response<userOutput>) => {
	const { username, email, password, role } = req.body;

	if (!username || !email || !password) {
		throw new AppError(400, 'bad request: required values missing or incorrect format');
	}

	const existing = await getUserByEmail(email);
	if (existing) {
		throw new AppError(500, 'user already exists');
	}

	const hashedPassword = await hashPassword(password);

	let capped: Role = roleEnum.USER;
	if (role) {
		let allCAPS = (role as string).toUpperCase() as Role;
		if (Object.values(roleEnum).includes(allCAPS)) {
			capped = allCAPS as Role;
		}
	}

	const created = await saveUserToDB({ username, email, hashedPassword, role: capped });

	if (!created) {
		throw new AppError(500, 'user registration failed, try again');
	}

	const token = await generateJwtToken(created);
	setJwtCookie(res, token);

	res.status(200).json({
		success: true,
		status: 200,
		message: 'user registered',
		user: excludePassword(created),
		token: token,
	});
};

export const login = async (req: Request, res: Response<userOutput>) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new AppError(400, 'bad request: please provide email and password for login');
	}

	const found = await getUserByEmail(email);
	if (!found) {
		throw new AppError(401, 'invalid credentials');
	}

	const passMatch = isPasswordValid(password, found.hashedPassword);
	if (!passMatch) {
		throw new AppError(401, 'invalid credentials');
	}

	const token = await generateJwtToken(found);
	setJwtCookie(res, token);

	res.status(200).json({
		success: true,
		status: 200,
		message: 'user logged in',
		user: excludePassword(found),
		token: token,
	});
};

export const logout = async (req: Request, res: Response) => {
	clearJwtCookie(res);
	res.status(200).json({
		success: true,
		status: 200,
		message: 'user logged out',
	});
};
