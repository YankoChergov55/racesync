import pino from "pino";

/**
 * Configured pino logger instance with pretty-printing and colorization enabled.
 *
 * @type {import('pino').Logger}
 */
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default logger;
