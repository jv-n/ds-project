import { NextFunction, Request, Response } from 'express';
import { FileRepository } from '../repositories';

class FileController {
  // Debug method to test multer configuration
  async debug(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);
      console.log('File:', req.file);
      console.log('Files:', req.files);
      
      res.locals = {
        status: 200,
        data: {
          headers: req.headers,
          body: req.body,
          file: req.file,
          files: req.files,
        },
        message: 'Debug info.',
      };

      return next();
    } catch (err) {
      return next(err);
    }
  }

  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[] || [];
      const apoioId = req.body.apoioId ? Number(req.body.apoioId) : null;

      if (!files.length) return next({ status: 400, message: 'Sem arquivos.' });

      // Chama repositório que salva no DB; pode usar transaction se quiser
      const saved = await FileRepository.uploadFiles(files, apoioId);

      res.locals = { status: 200, data: saved, message: 'Arquivos enviados' };
      return next();
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, filename } = req.params;

      await FileRepository.deleteFile(filename, id);

      res.locals = {
        status: 200,
        message: 'Arquivo deletado.',
      };

      return next();
    } catch (err) {
      return next(err);
    }
  }
}

export default new FileController();
