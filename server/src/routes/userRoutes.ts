import { Router } from 'express';
import auth from '../middlewares/auth';
import { UserController } from '../controllers/userController';

const router = Router();
const controller = new UserController();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get("/cnpj", controller.getByCnpj);
router.get("/email", controller.getByEmail);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
