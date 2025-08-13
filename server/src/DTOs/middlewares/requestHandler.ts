import { Request, Response, NextFunction } from 'express';

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any> | any;

const requestHandler = (controller: ControllerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);

      if (res.headersSent) return;

      if (!res.locals.status) {
        res.status(404).json({ message: 'Rota não encontrada.' });
        return;
      }

      res
        .status(res.locals.status)
        .json({ data: res.locals.data, message: res.locals.message });
    } catch (err) {
      next(err);
    }
  };
};

export default requestHandler;
