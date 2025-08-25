import { Router } from 'express';
import UserRouter from './UserRoutes';
import AuthRouter from './AuthRoutes';
import FileRouter from './FileRoutes';
import DonationRouter from './donationRoutes';
import CompanyRouter from './CompanyRoutes';
import ActionCompanyRouter from './actionCompanyRoutes';
import PasswordRouter from './passwordRoutes';
import SealRouter from './sealRoutes';
const router = Router();

router.use('/user', UserRouter);
router.use('/sessions', AuthRouter);
router.use('/file', FileRouter);
router.use('/company', CompanyRouter);
router.use('/password', PasswordRouter);
router.use('/seal', SealRouter);

router.use('/donation', DonationRouter);
router.use('/action-company', ActionCompanyRouter);
router.route('/').get((_, res) => {
  res.status(200).send('Running...');
});
router.route('/health').get((_, res) => {
  res.status(200).send('OK');
});

export default router;
