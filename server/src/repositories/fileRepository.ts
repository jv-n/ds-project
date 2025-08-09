import path from 'path';
import { Express } from 'express';
import prisma from '../database';

const fs = require('fs');

class FileRepository {
    private uploadFolder = path.resolve(__dirname, '..', 'uploads');

      async uploadFiles(files: Express.Multer.File[], apoioId?: number) {
        const createdFiles = [];

        // Opção segura: criar os registros em transação. Caso falhe, remover os arquivos do disco.
        try {
          const txCreates = files.map(f => {
            const storedName = f.filename;
            const filePath = path.join(this.uploadFolder, storedName);
            return prisma.file.create({
              data: {
                storedName,
                mimetype: f.mimetype,
                size: f.size,
                path: filePath,
                apoioId: apoioId ?? undefined,
              }
            });
          });

          const results = await prisma.$transaction(txCreates);
          return results;
        } catch (err) {
          // Se houve erro ao inserir no DB, deletar os arquivos do disco (limpeza)
          for (const f of files) {
            const p = path.join(this.uploadFolder, f.filename);
            if (fs.existsSync(p)) fs.unlinkSync(p);
          }
          throw err;
        }
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
