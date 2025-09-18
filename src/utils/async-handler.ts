import type { Request, Response, NextFunction } from "express";

/**
 * Wraps an async Express handler so errors are forwarded to `next()`.
 *
 * @template P - Route params
 * @template Locals - Response.locals
 *
 * @param fn - Async handler `(req, res) => Promise<void>`
 * @returns Express middleware `(req, res, next)`
 */
export function asyncHandler<
  P = Record<string, string>, // params
  ResBody = unknown, // response body
  ReqBody = unknown, // request body
  ReqQuery = Record<string, string>, // query
  Locals extends Record<string, unknown> = Record<string, unknown>, // response.locals
>(
  fn: (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
  ) => Promise<void>,
) {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction,
  ) => {
    fn(req, res).catch(next);
  };
}
