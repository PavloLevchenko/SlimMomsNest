import { Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger();
  logger.log(req.method + req.originalUrl, "Request...");
  next();
}
