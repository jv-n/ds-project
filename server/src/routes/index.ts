// src/routes/router.ts
import { Router } from 'express';

<<<<<<< HEAD
import UserRouter from './UserRoutes';
import AuthRouter from './AuthRoutes';
import FileRouter from './FileRoutes';
import DonationRouter from './DonationRoutes';
import { authMiddleware } from '../middlewares/authMiddleware'; // Importando o middleware de autenticação

const router = Router();

router.use('/user', UserRouter);
router.use('/sessions', AuthRouter);

// Aplicando o middleware de autenticação na rota de doações
router.use('/doacoes', authMiddleware, DonationRouter);

=======
import UserRouter from './userRoutes';
import AuthRouter from './authRoutes';
import FileRouter from './documentRoutes';
import DonationRouter from './donationRoutes';
import CompanyRouter from './companyRoutes';
import ActionCompanyRouter from './actionCompanyRoutes';
const router = Router();

router.use('/user', UserRouter);
router.use('/auth', AuthRouter);
>>>>>>> 144f911595d31a82ff15bc105c6bb70d980000dc
router.use('/file', FileRouter);
router.use('/donations', DonationRouter);
router.use('/actions', ActionCompanyRouter);
router.use('/company', CompanyRouter);

router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

<<<<<<< HEAD
export default router;

=======
export default router;
>>>>>>> 144f911595d31a82ff15bc105c6bb70d980000dc
