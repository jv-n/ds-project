import { Router } from 'express';
import { EmpresasController } from '../controllers/EmpresasController';

const router = Router();

router.get('/', EmpresasController.listarEmpresas);
router.post('/', EmpresasController.criarEmpresa);
router.put('/:id', EmpresasController.atualizarEmpresa);

export default router;
