// src/routes/router.ts
import { Router } from 'express';
import UserRouter from './userRoutes';
import AuthRouter from './authRoutes';
import FileRouter from './documentRoutes';
import DonationRouter from './donationRoutes';
import CompanyRouter from './companyRoutes';
import ActionCompanyRouter from './actionCompanyRoutes';
import PasswordRouter from './passwordRoutes';
import SealRouter from './sealRoutes';
const router = Router();

router.use('/user', UserRouter);
router.use('/auth', AuthRouter);
router.use('/file', FileRouter);
router.use('/donations', DonationRouter);
router.use('/actions', ActionCompanyRouter);
router.use('/company', CompanyRouter);
router.use('/password', PasswordRouter);
router.use('/seal', SealRouter);

router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;