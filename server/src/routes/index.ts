import { Router } from 'express';
import UserRouter from './userRoutes';
import AuthRouter from './AuthRoutes';
import FileRouter from './FileRoutes';
import DonationRouter from './donationRoutes';
import CompanyRouter from './CompanyRoutes';
import ActionCompanyRouter from './actionCompanyRoutes';
import sealRoutes from './sealRoutes';
import resetPasswordRouter from './resetPasswordRoutes';

const router = Router();

router.use('/password', resetPasswordRouter)
router.use('/selo', sealRoutes);
router.use('/user', UserRouter);
router.use('/sessions', AuthRouter);
router.use('/file', FileRouter);
router.use('/company', CompanyRouter);
router.use('/donation', DonationRouter);
router.use('/action-company', ActionCompanyRouter);
router.route('/').get((_, res) => {
  res.status(200).send('Running...');
});
router.route('/health').get((_, res) => {
  res.status(200).send('OK');
});

export default router;
