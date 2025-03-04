import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export const multerOptions: MulterOptions = {
  storage: multer.memoryStorage(), // Store files in memory before uploading to S3
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
  },
};
