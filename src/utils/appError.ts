/**
 * Custom error class for handling application-specific errors with HTTP status codes.
 * Extends the built-in `Error` class and adds extra metadata for operational error handling.
 */
export default class AppError extends Error {
	/**
	 * The associated HTTP status code for this error.
	 * @type {number}
	 */
	public httpStatus: number;

	/**
	 * Indicates whether the error is operational (expected, safe to handle)
	 * or a programming error (unexpected).
	 * @type {boolean}
	 */
	public isOperational: boolean;

	/**
	 * Creates an instance of `AppError`.
	 *
	 * @param {number} status - The HTTP status code to associate with this error.
	 * @param {string} message - A descriptive error message.
	 * @param {boolean} [isOperational=true] - Whether the error is operational (default: true).
	 */
	constructor(status: number, message: string, isOperational: boolean = true) {
		super(message);
		this.httpStatus = status;
		this.isOperational = isOperational;
		this.name = this.constructor.name;

		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this, this.constructor);
	}
}
