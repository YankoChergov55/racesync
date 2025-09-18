import type { Request, Response } from "express";
import logger from "@/utils/logger.js";

export async function healthCheckHandler(req: Request, res: Response) {
  logger.info(`
    server running
    current-time: ${new Date(Date.now()).toUTCString()}
    server uptime: ${Math.floor(process.uptime())}
  `);

  res.json({
    success: true,
    message: "server running",
    timestamp: new Date(Date.now()).toUTCString(),
    uptime: Math.floor(process.uptime()),
  });
}
