import express from "express";
import type { Express } from "express";
import { V1 } from "./routes.js";

/**
 * Creates and configures an Express application instance.
 *
 * @returns {Express} Configured Express app instance.
 */
export function eapp(): Express {
  const app = express();

  app.use(express.json());

  app.use("/api/v1", V1);

  return app;
}
