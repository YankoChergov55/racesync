import type { Prisma, Race } from '@prisma/client';
import { prisma } from '../../../database.js';

/**
 * Creates a new race entry in the database.
 * @async
 * @param {Prisma.RaceCreateInput} race - Race data as defined by Prisma schema.
 * @returns The newly created Race record.
 */
export async function saveRaceToDatabase(race: Prisma.RaceCreateInput) {
	return prisma.race.create({ data: race });
}

/**
 * Retrieves a race entry from the database by its unique ID.
 * @async
 * @param {Race['id']} id - The unique identifier of the race.
 * @returns The Race record if found, otherwise null.
 */
export async function getRaceById(id: Race['id']) {
	return prisma.race.findUnique({ where: { id } });
}

/**
 * Fetches a paginated list of race entries based on the provided filters.
 * @async
 * @param {Object} params - Query parameters for filtering and pagination.
 * @param {Race['type']} [params.type] - Type of race to filter by.
 * @param {Race['championship']} [params.championship] - Championship identifier to filter by.
 * @param {Race['raceStartTime']} [params.raceStartTime] - Start time to filter by.
 * @param {number} [params.page=1] - Page number for pagination.
 * @param {number} [params.pageSize=10] - Number of records per page.
 * @returns A paginated array of Race records.
 */
export async function getRaces({
	type,
	championship,
	raceStartTime,
	raceStartFrom,
	raceStartTo,
	page = 1,
	pageSize = 10,
}: {
	type?: Race['type'];
	championship?: Race['championship'];
	raceStartTime?: Race['raceStartTime'];
	raceStartFrom?: Date;
	raceStartTo?: Date;
	page?: number;
	pageSize?: number;
}) {
	const where: Prisma.RaceWhereInput = {};
	if (type) where.type = type;
	if (championship) where.championship = championship;

	if (raceStartTime) {
		where.raceStartTime = raceStartTime;
	} else {
		if (raceStartFrom || raceStartTo) {
			where.raceStartTime = {};
			if (raceStartFrom) where.raceStartTime.gte = raceStartFrom;
			if (raceStartTo) where.raceStartTime.lte = raceStartTo;
		}
	}

	const skip = (page - 1) * pageSize;

	return prisma.race.findMany({
		where,
		skip,
		take: pageSize,
	});
}

/**
 * Updates race data for the specified race ID.
 * @async
 * @param {Object} params - Parameters for update.
 * @param {Race['id']} params.id - The unique identifier of the race.
 * @param {Prisma.RaceUpdateInput} params.data - Fields to update.
 * @returns The updated Race record.
 */
export async function updateRaceData({ id, data }: { id: Race['id']; data: Prisma.RaceUpdateInput }) {
	return prisma.race.update({ where: { id }, data });
}

/**
 * Deletes the race entry for the specified race ID.
 * @async
 * @param {Race['id']} id - The unique identifier of the race.
 * @returns The deleted Race record.
 */
export async function deleteRaceData(id: Race['id']) {
	return prisma.race.delete({ where: { id } });
}

// export async function getRacesByType(type: Race['type']) {
// 	return prisma.race.findMany({ where: { type } });
// }

// export async function getRacesByChampionship(championship: Race['championship']) {
// 	return prisma.race.findMany({ where: { championship } });
// }

// export async function getRacesByDate(raceStartTime: Race['raceStartTime']) {
// 	return prisma.race.findMany({ where: { raceStartTime } });
// }
