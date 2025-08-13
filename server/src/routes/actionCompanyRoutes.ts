// src/routes/company-routes.ts
import { Router } from 'express';
import { ActionCompanyController } from '../controllers/actionCompanyController';

const router = Router();
const controller = new ActionCompanyController();

router.get('/', controller.getAllActions);
router.post('/', controller.create);
router.get('/company/:companyId', controller.getByCompanyId);
router.get('/:actionId/company/:companyId/donations', controller.getDonationsById);


export default router;
