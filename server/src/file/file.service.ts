import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { v4 } from 'uuid';

export const enum FILE_TYPE {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FILE_TYPE, file: Express.Multer.File): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = v4() + '.' + fileExtension;
      const filePath = resolve(__dirname, '..', 'static', type);

      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }

      writeFileSync(resolve(filePath, fileName), file.buffer);

      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string, type: FILE_TYPE) {
    try {
      const filePath = resolve(__dirname, '..', 'static', type, fileName);

      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
