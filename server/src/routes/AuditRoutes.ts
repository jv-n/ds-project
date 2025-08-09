// src/routes/company-routes.ts
import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';
import { AuditController } from '../controllers/AuditController';

const router = Router();
const controller = new CompanyController();
const controllerAudit = new AuditController();

router.post('/', controller.create);
router.post('/sendEmail', controllerAudit.sendEmail)

export default router;
