// src/routes/action-routes.ts
import { Router } from 'express';
import multer from 'multer';
import { ActionController } from '../controllers/ActionController';

const router = Router();
const controller = new ActionController();

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

router.post('/', upload.single('documentacao'), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', upload.single('documentacao'), controller.update);
router.delete('/:id', controller.delete);
router.get('/company/:empresaId', controller.getByCompany);

export default router;
