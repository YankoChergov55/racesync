import { Router } from "express";
import { healthRoutes } from "./features/health-check/health-check-route.js";

export const V1 = Router();

V1.use("/health-check", healthRoutes);
