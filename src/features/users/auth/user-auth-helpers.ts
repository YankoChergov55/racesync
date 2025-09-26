import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';
import appConfig from '@/config/appConfig.js';
import jwt from 'jsonwebtoken';
import type { Response, Request } from 'express';
import AppError from '@/utils/appError.js';

export type TokenPayload = {
	id: string;
	email: string;
};

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export async function isPasswordValid(password: string, hashedPassword: string) {
	return await bcrypt.compare(password, hashedPassword);
}

export async function generateJwtToken(user: User) {
	const payload: TokenPayload = {
		id: user.id,
		email: user.email,
	};

	return jwt.sign(payload, appConfig.jwtSecret, { expiresIn: 60 * 60 * 24 }); // 1day
}

export function setJwtCookie(res: Response, token: string) {
	res.cookie(appConfig.jwtCookie, token, {
		httpOnly: true,
		secure: appConfig.nodeEnv === 'production',
		sameSite: 'strict',
	});
}

export function clearJwtCookie(res: Response) {
	res.clearCookie(appConfig.jwtCookie, {
		httpOnly: true,
		secure: appConfig.nodeEnv === 'production',
		sameSite: 'strict',
	});
}

const isTokenValid = (token: jwt.JwtPayload | string): token is TokenPayload => {
	if (typeof token === 'object' && token !== null && 'id' in token && 'email' in token) {
		return true;
	}

	return false;
};

export function getJwtTokenFromCookie(req: Request) {
	const token = req.cookies[appConfig.jwtCookie];

	if (!token) {
		throw new AppError(401, 'No token found');
	}

	const decoded = jwt.verify(token, appConfig.jwtSecret);

	if (isTokenValid(decoded)) {
		return decoded;
	}

	throw new AppError(401, 'Invalid token');
}

export function excludePassword(user: any) {
	if (!user) return user;
	const { hashedPassword, ...rest } = user;
	return rest;
}
