// src/routes/DonationRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { DonationController } from '../controllers/DonationController';

const DonationRouter = Router();
const controller = new DonationController();

// Configuração do multer para uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Adicionando a rota POST para criar uma doação
DonationRouter.post('/', controller.create);

// Rotas existentes
DonationRouter.get('/', controller.getAll);
DonationRouter.get('/:id', controller.getById);

// Adicionando a rota PUT para atualizar uma doação
DonationRouter.put('/:id', controller.update);

// Rota existente
DonationRouter.delete('/:id', controller.delete);

export default DonationRouter;

