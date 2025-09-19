import type { Request, Response } from 'express';
import type { Prisma, RaceType, Race } from '@prisma/client';
import { $Enums } from '@prisma/client';

import AppError from '../../utils/appError.js';
import { saveRaceToDatabase, getRaceById, getRaces, updateRaceData, deleteRaceData } from './race-model.js';

type raceDetails = Prisma.RaceCreateInput;

const raceType = $Enums.RaceType;

interface raceOutput {
	success: boolean;
	status: number;
	message: string;
	data?: raceDetails | raceDetails[];
}

/**
 * Extracts a list of motorsport races based on parameters.
 *
 * @param {Request} req object that contains type, championship, raceStartTime, raceStartFrom, raceStartTo, page, pageSize provided by the user
 * @param {Response<raceOutput>} res json response with the list and status code
 * @returns a list of races based on the parameter
 */
export async function getRacesByParam(req: Request, res: Response<raceOutput>) {
	let { type, championship, raceStartTime, raceStartFrom, raceStartTo, page, pageSize } = req.query;

	const filter: {
		type?: Race['type'];
		championship?: Race['championship'];
		raceStartTime?: Race['raceStartTime'];
		raceStartFrom?: Date;
		raceStartTo?: Date;
		page?: number;
		pageSize?: number;
	} = {};

	if (type) {
		let allCaps = (type as string).toUpperCase() as RaceType;
		if (Object.values(raceType).includes(allCaps)) {
			filter.type = allCaps;
		}
	}

	if (championship) {
		filter.championship = championship as string;
	}

	if (raceStartTime) {
		const validDate = new Date(raceStartTime as string);
		if (!isNaN(validDate.getTime())) {
			filter.raceStartTime = validDate;
		}
	}

	if (raceStartFrom) {
		const fromDate = new Date(String(raceStartFrom));
		if (!isNaN(fromDate.getTime())) {
			filter.raceStartFrom = fromDate;
		}
	}

	if (raceStartTo) {
		const toDate = new Date(String(raceStartTo));
		if (!isNaN(toDate.getTime())) {
			filter.raceStartTo = toDate;
		}
	}

	if (page) filter.page = Number(page);
	if (pageSize) filter.pageSize = Number(pageSize);

	const races = await getRaces(filter);

	res.status(200).json({
		success: true,
		status: 200,
		message: `list of races matching filter`,
		data: races,
	});
}

/**
 * Processes request parameters to get the id of a race and extract it data from the database.
 *
 * @param {Request} req - Request object that contains race ID
 * @param {Response<raceOutput>} res - Response object used to send the response
 * @returns {Promise<void>} Sends json response with the race data
 * @throws {AppError} Throws error if the race data is not found
 */
export async function getRace(req: Request, res: Response<raceOutput>): Promise<void> {
	const id = req.params.id;

	if (!id) {
		throw new AppError(400, 'bad request: missing id');
	}

	const found = await getRaceById(id);

	if (!found) {
		throw new AppError(404, 'race not found');
	}

	res.status(200).json({
		success: true,
		status: 200,
		message: 'get race',
		data: found,
	});
}

/**
 * ADMIN function. Processes request parameters, validates required fields,
 * and creates a new race record in the database.
 *
 * @param {Request<raceDetails>} req - Request object containing race details in the body.
 * @param {Response<raceOutput>} res - Response object used to send the server response.
 * @returns {Promise<void>} Sends JSON response indicating success or failure.
 * @throws {AppError} Throws errors for bad requests or creation failure.
 */
export async function createRace(req: Request<raceDetails>, res: Response<raceOutput>): Promise<void> {
	let { title, championship, type, location, raceStartTime } = req.body;

	if (!title || !location || !raceStartTime || !championship || !type) {
		throw new AppError(400, 'bad request: missing required fields - title, location, raceStartTime');
	}

	if (Object.values(raceType).includes(type.toUpperCase())) {
		type = type.toUpperCase();
	}

	const created = await saveRaceToDatabase({ title, championship, type, location, raceStartTime });

	if (!created) {
		throw new AppError(500, 'creation failed, try again');
	}

	res.status(200).json({
		success: true,
		status: 200,
		message: 'created race',
		data: created,
	});
}

/**
 * ADMIN function
 * Gets ID and new data from Request object and updates a race with new data.
 *
 * @param {Request<raceDetails>} req object that contains id and data provided by user
 * @param {Response<raceOutput>} res object used to send the response depending on results
 * @returns {Promise<void>} sends json response with the updated data
 * @throws {AppError} if id is missing or update fails
 */
export async function updateRace(req: Request<raceDetails>, res: Response<raceOutput>): Promise<void> {
	const id = req.params.id;
	const update: raceDetails = req.body;

	if (!id) {
		throw new AppError(400, 'bad request: missing id');
	}

	const updated = await updateRaceData({ id, data: update });

	if (!updated) {
		throw new AppError(404, 'update failed');
	}

	res.status(200).json({
		success: true,
		status: 200,
		message: 'updated race',
		data: updated,
	});
}

/**
 * ADMIN function
 * Looks up race by id and deletes it
 *
 * @param {Request<raceDetails>} req object containing the id
 * @param {Response<raceOutput>} res object used to send response
 * @returns {Promise<void>} returns json response with the deleted record
 * @throws {AppError} if id is missing or deletion does not work
 */
export async function deleteRace(req: Request<raceDetails>, res: Response<raceOutput>): Promise<void> {
	const id = req.params.id;

	if (!id) {
		throw new AppError(400, 'bad request: missing id');
	}

	const deleted = await deleteRaceData(id);

	if (!deleted) {
		throw new AppError(500, 'deletion failed');
	}

	res.status(200).json({
		success: true,
		status: 200,
		message: 'deleted race',
		data: deleted,
	});
}
