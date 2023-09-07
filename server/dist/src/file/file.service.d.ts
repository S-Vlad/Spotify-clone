/// <reference types="multer" />
export declare const enum FILE_TYPE {
    AUDIO = "audio",
    IMAGE = "image"
}
export declare class FileService {
    createFile(type: FILE_TYPE, file: Express.Multer.File): string;
    removeFile(fileName: string, type: FILE_TYPE): void;
}
