import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const errorHandler = (
  error: any, // Changed to any to handle various error types including multer
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!error) return next();

  res.locals.status = error.status || 500;
  res.locals.message = error.message || 'Algo deu errado.';

  // Handle Multer errors
  if (error.code === 'UNEXPECTED_FIELD') {
    res.locals.status = 400;
    res.locals.message = `Campo inesperado: ${error.field}. Certifique-se de que o campo de upload se chama 'file'.`;
  }

  if (error.code === 'LIMIT_FILE_SIZE') {
    res.locals.status = 400;
    res.locals.message = 'Arquivo muito grande. Tamanho máximo permitido: 10MB.';
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    res.locals.status = 400;
    res.locals.message = 'Muitos arquivos enviados. Apenas um arquivo é permitido.';
  }

  if (error instanceof ZodError) {
    res.locals.status = 400;
    const errors: string[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const issue of error.issues) {
      errors.push(`${issue.path.join('.')} ${issue.message}`);
    }
    res.locals.message = errors.join(', ');
  }

  if (error instanceof PrismaClientKnownRequestError) {
    res.locals.status = 400;
    res.locals.message = error.meta;

    if (error.code === 'P2025') {
      res.locals.status = 404;
      res.locals.message = 'Não encontrado.';
    }
  }

  return next();
};

export default errorHandler;
