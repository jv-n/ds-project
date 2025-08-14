import { Router } from 'express';
import { SealController } from '../controllers/sealController';

const router = Router();
const controller = new SealController();

router.get('/empresa/:id', controller.getCompanySeal);

export default router;
