import type { Prisma, User } from '@prisma/client';
import { prisma } from '../../../database.js';

export interface filter {
	page?: number;
	pageSize?: number;
	role?: string;
}

export async function getAllUsersFromDB({ page = 1, pageSize = 10 }: filter) {
	const skip = (page - 1) * pageSize;
	return prisma.user.findMany({ skip, take: pageSize, orderBy: { createdAt: 'desc' } });
}

export async function saveUserToDB(user: Prisma.UserCreateInput) {
	return prisma.user.create({ data: user });
}

export async function getUserById(id: User['id']) {
	return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
	return prisma.user.findUnique({ where: { email } });
}

export async function upUserData({ id, data }: { id: User['id']; data: Prisma.UserUpdateInput }) {
	return prisma.user.update({ where: { id }, data });
}

export async function delUserData(id: User['id']) {
	return prisma.user.delete({ where: { id } });
}
