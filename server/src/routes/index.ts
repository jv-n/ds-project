import { Router } from 'express';

import UserRouter from './UserRoutes';
import AuthRouter from './AuthRoutes';
import FileRouter from './FileRoutes';
import ActionRouter from './ActionRoutes';
import CompanyRouter from './CompanyRoutes';
import AuditRouter from './AuditRoutes';
const router = Router();

router.use('/user', UserRouter);
router.use('/sessions', AuthRouter);
router.use('/file', FileRouter);
router.use('/action', ActionRouter);
router.use('/audit', AuditRouter);
router.use('/company', CompanyRouter);

router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;