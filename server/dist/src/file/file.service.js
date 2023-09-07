"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
let FileService = exports.FileService = class FileService {
    createFile(type, file) {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = (0, uuid_1.v4)() + '.' + fileExtension;
            const filePath = (0, path_1.resolve)(__dirname, '..', 'static', type);
            if (!(0, fs_1.existsSync)(filePath)) {
                (0, fs_1.mkdirSync)(filePath, { recursive: true });
            }
            (0, fs_1.writeFileSync)((0, path_1.resolve)(filePath, fileName), file.buffer);
            return type + '/' + fileName;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    removeFile(fileName, type) {
        try {
            const filePath = (0, path_1.resolve)(__dirname, '..', 'static', type, fileName);
            if ((0, fs_1.existsSync)(filePath)) {
                (0, fs_1.unlinkSync)(filePath);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map