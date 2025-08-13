import { Router } from 'express';

import UserRouter from './UserRoutes';
import AuthRouter from './AuthRoutes';
import FileRouter from './FileRoutes';
import CompanyRouter from './CompanyRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/sessions', AuthRouter);
router.use('/file', FileRouter);
router.use('/company', CompanyRouter);
router.route('/').get((_, res) => {
  res.status(200).send('Made by Equipe 5');
});

export default router;
