import path from 'path';
import { Express } from 'express';
import prisma from '../database';

const fs = require('fs');

class FileRepository {
    private uploadFolder = path.resolve(__dirname, '..', 'uploads');

    async uploadFile(file: Express.Multer.File, filename?: string): Promise<string> {
        const { originalname } = file;
        const storedName = filename || `${Date.now().toString()}-${originalname}`;
        const filePath = path.join(this.uploadFolder, storedName);

        await prisma.file.create({
          data: {
            storedName,
            mimetype: file.mimetype,
            size: file.size,
            path: filePath,
            status: "pendente"
          },
        });
        
        return filePath;
    }

  // async saveFileInfo(originalName: string, storedName: string, file: Express.Multer.File): Promise<void> {
  //   const filePath = path.join(this.uploadFolder, storedName);

  //   await prisma.file.create({
  //     data: {
  //       storedName,
  //       mimetype: file.mimetype,
  //       size: file.size,
  //       path: filePath,
  //     },
  //   });
  // }

  async deleteFile(storedName: string, id: string): Promise<void> {
    const filePath = path.join(this.uploadFolder, storedName);
    
    // Delete the file from the filesystem
   
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove the file info from the database
    await prisma.file.delete({
      where: { id },
    });
  }
}

export default new FileRepository();
