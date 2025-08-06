// src/routes/router.ts
import { Router } from 'express';

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

router.use('/file', FileRouter);
router.route('/').get((_, res) => {
  res.status(200).send('Made with 💚 and &lt; &#x0002F; &gt; by CITi');
});

export default router;

