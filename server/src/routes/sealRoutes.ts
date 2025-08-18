import { Router } from 'express';
import { SealController } from '../controllers/sealController';

const router = Router();
const controller = new SealController();

router.get('/company/:id', controller.getCompanySeal);
router.get('/company/:id/history', controller.getCompanySealHistory);


export default router;