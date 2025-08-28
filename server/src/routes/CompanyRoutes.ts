// src/routes/company-routes.ts
import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

const router = Router();
const controller = new CompanyController();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
