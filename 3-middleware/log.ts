import { NextFunction, Request, Response } from "express";

export function logRequest(req: Request, res: Response, next: NextFunction) {
    console.log(`[Muzmanim server log]: ${new Date().getTime()}: Request type: ${req.method}, Request URL: ${req.url}`);
    next();
}