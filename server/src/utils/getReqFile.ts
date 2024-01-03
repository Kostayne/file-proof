import { Request } from "express";
import { UploadedFile } from "express-fileupload";

/**
 * @description returns req.files.file
 * @param req Express request
 */
export function getRequestFile(req: Request) {
    if (!req.files || !req.files.file) {
        return null;
    }

    return req.files.file as UploadedFile;
}