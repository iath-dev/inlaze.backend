import type { NestMiddleware } from "@nestjs/common";
import { Injectable, Logger } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  public use(req: Request, res: Response, next: NextFunction): void {
    const { method, url } = req;
    const userAgent = req.get("user-agent") || "";
    const now = Date.now();

    res.on("finish", () => {
      const responseTime = Date.now() - now;
      this.logger.log(`${method} ${url} - ${res.statusCode} [${responseTime}ms] - ${userAgent}`);
    });

    next();
  }
}
