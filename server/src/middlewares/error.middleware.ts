import { NextFunction, Request, Response } from "express";

export function errorMiddleware(err: Error, _: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send('Error happened');
}